import React, { useState, useEffect } from "react";
import { Gift, Bell, CheckCircle, Clock, List, Power, MapPin, Zap, Calendar as CalIcon } from "lucide-react";
import { useSearchParams, useNavigate } from "react-router-dom";

// 🔥 FIREBASE IMPORTS
import { db } from "../../firebase";
import { doc, setDoc, collection, query, where, onSnapshot, updateDoc, increment } from "firebase/firestore";

export default function WorkerDashboard() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const activeSection = searchParams.get("tab") || "home";

  // State to hold logged-in worker details
  const [workerDetails, setWorkerDetails] = useState({ id: "", driver: "" });

  // GPS & Live Status
  const [currentPosition, setCurrentPosition] = useState({ lat: 0, lng: 0 });
  const [isOnline, setIsOnline] = useState(false);

  // 🔥 Dynamic Database States
  const [availableRequests, setAvailableRequests] = useState([]);
  const [myTasks, setMyTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [workerStats, setWorkerStats] = useState({ totalRewards: 0 });

  // 1. Fetch Worker Session Data on Load
  useEffect(() => {
    const sessionData = localStorage.getItem("evora_loggedInUser");
    if (!sessionData) {
      navigate("/WorkerLogin");
      return;
    }
    const parsedData = JSON.parse(sessionData);
    if (parsedData.role !== "worker") {
      navigate("/WorkerLogin");
      return;
    }
    setWorkerDetails({
      uid: parsedData.uid,
      id: parsedData.vehicleId,
      driver: parsedData.username
    });
  }, [navigate]);

  // 2. GPS Tracking Effect & Dynamic Stats
  useEffect(() => {
    let watchId;
    let batteryInterval;

    if (isOnline && workerDetails.id) {
      if (!navigator.geolocation) {
        alert("Tracking location not supported by your browser.");
        return;
      }

      // Start Battery Simulation (Drains 1% every 30 seconds)
      let currentBattery = 100;
      batteryInterval = setInterval(() => {
        currentBattery = Math.max(0, currentBattery - 1);
      }, 30000);

      watchId = navigator.geolocation.watchPosition(
        async (pos) => {
          const { latitude, longitude, speed } = pos.coords;
          const newPos = { lat: latitude, lng: longitude };
          setCurrentPosition(newPos);

          // Calculate a simulated speed for desktop testing if 'speed' is null
          // (In a real mobile app, pos.coords.speed works perfectly)
          const simulatedSpeed = speed ? Math.round(speed * 3.6) : Math.floor(Math.random() * (45 - 15 + 1) + 15);

          try {
            // 🔥 CHANGE: Use workerDetails.uid here instead of workerDetails.id
            await setDoc(doc(db, "workers", workerDetails.uid), {
              id: workerDetails.id, // Keep the vehicle number inside the document data
              driver: workerDetails.driver,
              status: simulatedSpeed > 0 ? "Moving" : "Idle",
              location: newPos,
              speed: `${simulatedSpeed} km/h`,
              battery: `${currentBattery}%`,
              load: "65%",
              lastUpdated: new Date().toISOString()
            }, { merge: true });
          } catch (error) {
            console.error("Firebase update error:", error);
          }
        },
        (err) => console.error(err),
        { enableHighAccuracy: true, maximumAge: 1000, timeout: 5000 }
      );
    }

    return () => {
      if (watchId) navigator.geolocation.clearWatch(watchId);
      if (batteryInterval) clearInterval(batteryInterval);
    };
  }, [isOnline, workerDetails]);

  // 3. 🔥 LIVE DATABASE LISTENER 1: The Dispatch Radar (Unassigned tasks)
  useEffect(() => {
    const q = query(collection(db, "pickups"), where("status", "in", ["Pending", "Scheduled"]));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const pending = [];
      snapshot.forEach(doc => {
        pending.push({ id: doc.id, ...doc.data() });
      });
      // Sort so "Instant" requests show up at the top
      pending.sort((a, b) => a.type === "Instant" ? -1 : 1);
      setAvailableRequests(pending);
    });
    return () => unsubscribe();
  }, []);

  // 4. 🔥 LIVE DATABASE LISTENER 2: My Tasks & History (Tasks assigned to THIS worker)
  useEffect(() => {
    if (!workerDetails.id) return;
    const q = query(collection(db, "pickups"), where("assignedWorkerId", "==", workerDetails.id));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const active = [];
      const completed = [];
      snapshot.forEach(doc => {
        const data = { id: doc.id, ...doc.data() };
        if (data.status === "Assigned") active.push(data);
        if (data.status === "Completed") completed.push(data);
      });

      // Sort completed tasks by newest first
      completed.sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt));

      setMyTasks(active);
      setCompletedTasks(completed);
    });
    return () => unsubscribe();
  }, [workerDetails.id]);

  // 5. 🔥 LIVE DATABASE LISTENER 3: Worker Rewards
  useEffect(() => {
    // 🔥 FIX: We must listen to the document using the UID, not the vehicle ID string
    if (!workerDetails.uid) return;

    const unsubscribe = onSnapshot(doc(db, "workers", workerDetails.uid), (docSnap) => {
      if (docSnap.exists()) {
        setWorkerStats({ totalRewards: docSnap.data().totalRewards || 0 });
      }
    });
    return () => unsubscribe();
  }, [workerDetails.uid]); // 🔥 FIX: Dependency array updated to uid

  // 6. Accept a Task
  const handleAcceptTask = async (taskId) => {
    if (!isOnline) {
      alert("You must be Online to accept tasks!");
      return;
    }
    try {
      await updateDoc(doc(db, "pickups", taskId), {
        status: "Assigned",
        assignedWorkerId: workerDetails.id,
        assignedDriverName: workerDetails.driver
      });
    } catch (error) {
      console.error("Error accepting task:", error);
    }
  };

  // 7. 🔥 Mark Task Complete & Add Rewards!
  const handleCompleteTask = async (taskId) => {
    const rewardPoints = 50; // Standard reward for a pickup
    try {
      // 1. Update the pickup document
      await updateDoc(doc(db, "pickups", taskId), {
        status: "Completed",
        completedAt: new Date().toISOString(),
        rewardEarned: rewardPoints
      });

      // 2. Add points to the worker's total in the database
      // 🔥 CRITICAL FIX: Changed workerDetails.id to workerDetails.uid
      await updateDoc(doc(db, "workers", workerDetails.uid), {
        totalRewards: increment(rewardPoints)
      });

    } catch (error) {
      console.error("Error completing task:", error);
      alert("Task marked complete, but there was an error updating rewards.");
    }
  };

  // Helper to format dates for the History section
  const formatDate = (isoString) => {
    if (!isoString) return "N/A";
    return new Date(isoString).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  // Static UI Elements
  const notifications = [
    "New zone assigned: Sector 9.",
    "System maintenance tonight at 11 PM.",
  ];
  const recentActivity = completedTasks.slice(0, 2).map(task => `Completed: ${task.wasteType} Collection (+${task.rewardEarned || 50} pts)`);
  if (recentActivity.length === 0) recentActivity.push("No recent activity yet.");
  const motivationQuotes = ["Every effort counts—keep going!", "Your work creates a cleaner tomorrow."];
  const redeemable = [{ id: 1, name: "₹100 Cash Voucher", status: "Available" }];

  return (
    <div className="flex-1 w-full bg-black text-white font-inter">
      <main className="p-6 md:p-8 overflow-y-auto max-w-6xl mx-auto w-full">

        {/* ------------------------------------------------------------- */}
        {/* HOME SECTION */}
        {activeSection === "home" && (
          <div className="animate-in fade-in duration-300">

            {/* LIVE TRACKING CONTROL PANEL */}
            <div className="bg-[#0a0a0a] border border-[#00ff9d40] rounded-2xl p-6 mb-8 flex justify-between items-center shadow-lg">
              <div>
                <h2 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
                  <MapPin size={20} className={isOnline ? "text-[#00ff9d]" : "text-gray-500"} />
                  Vehicle Link: <span className="text-[#00ff9d] ml-2 font-mono">{workerDetails.id}</span>
                </h2>
                <p className="text-sm text-gray-400">
                  {isOnline ? "Broadcasting live location to Doon SICC." : "You are currently offline."}
                </p>
                {isOnline && (
                  <p className="text-xs text-[#00ff9d] font-mono mt-2 bg-[#00ff9d]/10 inline-block px-2 py-1 rounded border border-[#00ff9d]/30">
                    LAT: {currentPosition.lat.toFixed(5)} | LNG: {currentPosition.lng.toFixed(5)}
                  </p>
                )}
              </div>

              <button
                onClick={() => setIsOnline(!isOnline)}
                className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg ${isOnline
                  ? "bg-red-500/10 text-red-500 border border-red-500/30 hover:bg-red-500/20"
                  : "bg-[#00ff9d] text-black hover:shadow-[0_0_20px_rgba(0,255,153,0.4)]"
                  }`}
              >
                <Power size={18} /> {isOnline ? "Go Offline" : "Go Online"}
              </button>
            </div>

            {/* DISPATCH RADAR */}
            {isOnline && (
              <div className="mb-8 border-2 border-[#00ff9d]/30 bg-[#00ff9d]/5 rounded-2xl p-6 shadow-[0_0_20px_rgba(0,255,153,0.1)]">
                <h2 className="text-lg font-bold text-[#00ff9d] mb-4 flex items-center gap-2">
                  <Zap size={20} className="animate-pulse" /> Dispatch Radar: Incoming Requests ({availableRequests.length})
                </h2>

                {availableRequests.length === 0 ? (
                  <p className="text-gray-400 text-sm text-center py-6">Scanning your zone for pickups...</p>
                ) : (
                  <div className="space-y-3">
                    {availableRequests.map(req => (
                      <div key={req.id} className="bg-[#0a0f1b] border border-gray-800 p-4 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-[#00ff9d]/50 transition-colors">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${req.type === 'Instant' ? 'bg-red-500/10 text-red-400 border-red-500/30' : 'bg-blue-500/10 text-blue-400 border-blue-500/30'}`}>
                              {req.type}
                            </span>
                            <span className="font-bold text-white">{req.wasteType?.toUpperCase()}</span>
                          </div>
                          <p className="text-sm text-gray-400 flex items-center gap-1">
                            <CalIcon size={12} /> {req.date} • {req.timeSlot}
                          </p>
                          <p className="text-xs text-gray-500 mt-1 truncate max-w-sm">
                            <MapPin size={12} className="inline mr-1" />
                            {req.address || "Live GPS Location"}
                          </p>
                        </div>
                        <button
                          onClick={() => handleAcceptTask(req.id)}
                          className="w-full md:w-auto px-6 py-2.5 bg-[#00ff9d] text-black font-bold rounded-lg hover:shadow-[0_0_15px_#00ff9d] transition-all active:scale-95 whitespace-nowrap"
                        >
                          Accept Job
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Dynamic Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-5 bg-[#0a0a0a] border border-[#00ff9d40] rounded-2xl shadow-lg">
                <p className="text-gray-400 font-medium mb-1">My Active Tasks</p>
                <p className="text-[#00ff9d] text-4xl font-bold">{myTasks.length}</p>
              </div>
              <div className="p-5 bg-[#0a0a0a] border border-[#00ff9d40] rounded-2xl shadow-lg">
                <p className="text-gray-400 font-medium mb-1">Total Completed</p>
                <p className="text-[#00ff9d] text-4xl font-bold">{completedTasks.length}</p>
              </div>
              <div className="p-5 bg-[#0a0a0a] border border-[#00ff9d40] rounded-2xl shadow-lg">
                <p className="text-gray-400 font-medium mb-1">Total Rewards</p>
                <p className="text-[#00ff9d] text-4xl font-bold flex items-center gap-2">
                  {workerStats.totalRewards} <Gift size={24} className="opacity-50" />
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#0a0a0a] border border-[#00ff9d20] rounded-2xl p-6">
                <h2 className="text-xl font-bold text-[#00ff9d] mb-4 flex items-center gap-2 border-b border-gray-800 pb-3">
                  <Bell size={20} /> Notifications
                </h2>
                <ul className="space-y-3">
                  {notifications.map((note, i) => (
                    <li key={i} className="p-3 bg-[#050505] border border-gray-800 rounded-xl text-sm text-gray-300">{note}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-[#0a0a0a] border border-[#00ff9d20] rounded-2xl p-6">
                <h2 className="text-xl text-[#00ff9d] font-bold mb-4 flex items-center gap-2 border-b border-gray-800 pb-3">
                  <CheckCircle size={20} /> Recent Activity
                </h2>
                <ul className="space-y-3">
                  {recentActivity.map((act, i) => (
                    <li key={i} className="text-gray-300 text-sm p-3 bg-[#050505] rounded-xl border border-gray-800">{act}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* 🔥 TASKS SECTION (Now Shows Both Active & Completed) */}
        {activeSection === "tasks" && (
          <div className="animate-in fade-in duration-300">
            <h1 className="text-3xl font-bold text-white mb-6 border-b border-gray-800 pb-4">My Tasks</h1>

            {/* Active Tasks */}
            <h2 className="text-xl text-[#00ff9d] font-bold mb-4 flex items-center gap-2"><List size={20} /> Active Tasks ({myTasks.length})</h2>
            {myTasks.length === 0 ? (
              <div className="text-center text-gray-500 py-6 mb-8 bg-[#0a0a0a] rounded-2xl border border-gray-800">
                <p>No active tasks. Go to the Home tab and Accept a request to start working!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                {myTasks.map((task) => (
                  <div key={task.id} className="p-5 bg-[#0a0a0a] border border-[#00ff9d40] rounded-2xl flex flex-col justify-between relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-1 h-full bg-[#00ff9d]"></div>
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-white font-bold text-lg">{task.wasteType?.toUpperCase()} Collection</h3>
                        <span className={`text-xs font-bold px-2 py-1 rounded border ${task.type === 'Instant' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'}`}>{task.type}</span>
                      </div>
                      <p className="text-gray-400 text-sm mb-4 bg-white/5 inline-block px-2 py-1 rounded">Citizen: {task.citizenName}</p>

                      <div className="space-y-2 mb-6 text-sm">
                        <p className="text-gray-300 flex items-center gap-2"><Clock size={14} className="text-gray-500" /> {task.timeSlot}</p>
                        <p className="text-gray-300 flex items-start gap-2">
                          <MapPin size={14} className="text-gray-500 mt-1 shrink-0" />
                          <span>{task.address || "GPS Marker Required"}</span>
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleCompleteTask(task.id)}
                      className="w-full py-3 bg-transparent border border-[#00ff9d] text-[#00ff9d] hover:bg-[#00ff9d] hover:text-black rounded-xl font-bold hover:shadow-[0_0_15px_#00ff9d] transition-all active:scale-[0.98] flex justify-center items-center gap-2 mt-4"
                    >
                      <CheckCircle size={18} /> Mark Complete
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Completed Tasks Summary in Tasks Tab */}
            <h2 className="text-xl text-gray-400 font-bold mb-4 flex items-center gap-2"><CheckCircle size={20} /> Completed Tasks ({completedTasks.length})</h2>
            {completedTasks.length === 0 ? (
              <div className="text-center text-gray-500 py-6 bg-[#0a0a0a] rounded-2xl border border-gray-800">
                <p>You haven't completed any tasks yet.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {completedTasks.slice(0, 5).map((t) => (
                  <div key={t.id} className="p-4 bg-[#0a0a0a] border border-gray-800 rounded-xl flex justify-between items-center">
                    <div>
                      <p className="font-medium text-gray-300">{t.wasteType?.toUpperCase()} Collection</p>
                      <p className="text-xs text-gray-500">Citizen: {t.citizenName}</p>
                    </div>
                    <p className="text-[#00ff9d] font-bold bg-[#00ff9d10] px-3 py-1 rounded-lg border border-[#00ff9d30]">+{t.rewardEarned || 50} Points</p>
                  </div>
                ))}
                {completedTasks.length > 5 && <p className="text-center text-sm text-gray-500 mt-4">View History tab for all completed tasks.</p>}
              </div>
            )}
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* REWARDS SECTION */}
        {activeSection === "rewards" && (
          <div className="animate-in fade-in duration-300">
            <h1 className="text-3xl font-bold text-white mb-6 border-b border-gray-800 pb-4">Rewards</h1>

            {/* Total */}
            <div className="p-8 bg-gradient-to-r from-[#00ff9d10] to-[#0a0a0a] border border-[#00ff9d40] rounded-3xl mb-8 flex items-center justify-between shadow-lg">
              <div>
                <p className="text-gray-400 font-medium mb-1">Total Available Rewards</p>
                <p className="text-[#00ff9d] text-5xl font-extrabold">
                  {workerStats.totalRewards} <span className="text-xl">Pts</span>
                </p>
              </div>
              <Gift size={64} className="text-[#00ff9d] opacity-20" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Breakdown */}
              <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6">
                <h2 className="text-lg text-white font-bold mb-4 border-b border-gray-800 pb-2">Reward Breakdown</h2>
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-300"><span className="text-gray-500">Task Completion:</span> <span className="font-bold">{workerStats.totalRewards}</span></div>
                  <div className="flex justify-between text-gray-300"><span className="text-gray-500">Punctuality Bonus:</span> <span className="font-bold">0</span></div>
                  <div className="flex justify-between text-gray-300"><span className="text-gray-500">Extra Efforts:</span> <span className="font-bold text-[#00ff9d]">0</span></div>
                </div>
              </div>

              {/* Redeemable */}
              <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6">
                <h2 className="text-lg text-white font-bold mb-4 border-b border-gray-800 pb-2">Redeemable Rewards</h2>
                <div className="space-y-3">
                  {redeemable.map((r) => (
                    <div key={r.id} className="p-3 bg-[#050505] border border-gray-800 rounded-xl flex justify-between items-center">
                      <p className="font-medium text-gray-300">{r.name}</p>
                      <button className="px-4 py-1.5 rounded-lg text-xs font-bold transition-all bg-[#00ff9d] text-black hover:shadow-[0_0_10px_#00ff9d]">
                        Redeem
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* 🔥 WORK HISTORY SECTION (Now connected to Database) */}
        {activeSection === "history" && (
          <div className="animate-in fade-in duration-300">
            <h1 className="text-3xl font-bold text-white mb-6 border-b border-gray-800 pb-4">
              Work History
            </h1>

            {completedTasks.length === 0 ? (
              <div className="text-center text-gray-500 py-10 bg-[#0a0a0a] rounded-2xl border border-gray-800">
                <p>Your completed tasks history will appear here.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {completedTasks.map((work) => (
                  <div
                    key={work.id}
                    className="bg-[#0a0a0a] border border-gray-800 hover:border-[#00ff9d40] transition-colors rounded-2xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                  >
                    <div>
                      <p className="text-white font-bold text-lg">{work.wasteType?.toUpperCase()} Collection</p>
                      <p className="text-gray-400 text-sm flex items-center gap-2 mt-1">
                        <Clock size={14} /> {formatDate(work.completedAt)} • {work.type}
                      </p>
                    </div>
                    <div className="flex gap-4 items-center">
                      <div className="text-right">
                        <p className="text-gray-500 text-xs">Points Earned</p>
                        <p className="text-[#00ff9d] font-bold">+{work.rewardEarned || 50}</p>
                      </div>
                      <div className="h-10 w-px bg-gray-800 hidden md:block"></div>
                      <div className="text-right">
                        <p className="text-gray-500 text-xs">Rating</p>
                        <p className="text-yellow-400 font-bold flex items-center gap-1">⭐ 5.0</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}