import React, { useState, useEffect } from "react";
import { Home, List, Gift, Clock, Activity, User, LogOut } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

// 🔥 Firebase Imports
import { getAuth, signOut } from "firebase/auth";

export default function WorkerNavbar() {
    const navigate = useNavigate();
    const auth = getAuth();

    const [searchParams, setSearchParams] = useSearchParams();
    const activeSection = searchParams.get("tab") || "home";

    // 1. State for Worker Info
    const [workerInfo, setWorkerInfo] = useState({
        id: "Loading...",
        fullName: "Worker",
    });

    // 2. Fetch data from the secure evora_loggedInUser session
    useEffect(() => {
        try {
            // We use the new session key created in WorkerLogin.jsx
            const storedData = localStorage.getItem("evora_loggedInUser");

            if (storedData) {
                const parsedData = JSON.parse(storedData);

                // Only set if the role is worker
                if (parsedData.role === "worker") {
                    setWorkerInfo({
                        id: parsedData.vehicleId || "N/A", // We used vehicleId in WorkerLogin
                        fullName: parsedData.username || "Worker",
                    });
                }
            }
        } catch (error) {
            console.error("Failed to parse worker data from local storage:", error);
        }
    }, []);

    const handleTabChange = (tab) => {
        setSearchParams({ tab });
    };

    // 3. Secure Firebase Logout
    const handleLogout = async () => {
        try {
            await signOut(auth); // Disconnect from Firebase Backend
            localStorage.removeItem("evora_loggedInUser"); // Clear local session

            // Clean up old location tracking data if any exists
            for (let key in localStorage) {
                if (key.startsWith("workerLocation_")) {
                    localStorage.removeItem(key);
                }
            }
            navigate("/");
        } catch (error) {
            console.error("Error logging out worker:", error);
        }
    };

    return (
        <nav className="bg-[#0a0a0a] border-b border-[#00ff9d40] px-6 py-4 flex justify-between items-center sticky top-0 z-50">
            {/* Left Side: Logo & Navigation */}
            <div className="flex items-center gap-8">
                <div className="flex items-center gap-2">
                    <Activity size={24} className="text-[#00ff9d]" />
                    <span className="text-xl font-bold text-white tracking-wide">
                        CivicFlow <span className="text-[#00ff9d] text-sm">Worker</span>
                    </span>
                </div>

                <div className="hidden md:flex gap-2">
                    <button
                        onClick={() => handleTabChange("home")}
                        className={`px-4 py-2 rounded-xl flex items-center gap-2 transition font-medium ${activeSection === "home" ? "bg-[#00ff9d20] text-[#00ff9d]" : "text-gray-400 hover:text-white"
                            }`}
                    >
                        <Home size={18} /> Home
                    </button>
                    <button
                        onClick={() => handleTabChange("tasks")}
                        className={`px-4 py-2 rounded-xl flex items-center gap-2 transition font-medium ${activeSection === "tasks" ? "bg-[#00ff9d20] text-[#00ff9d]" : "text-gray-400 hover:text-white"
                            }`}
                    >
                        <List size={18} /> My Tasks
                    </button>
                    <button
                        onClick={() => handleTabChange("rewards")}
                        className={`px-4 py-2 rounded-xl flex items-center gap-2 transition font-medium ${activeSection === "rewards" ? "bg-[#00ff9d20] text-[#00ff9d]" : "text-gray-400 hover:text-white"
                            }`}
                    >
                        <Gift size={18} /> Rewards
                    </button>
                    <button
                        onClick={() => handleTabChange("history")}
                        className={`px-4 py-2 rounded-xl flex items-center gap-2 transition font-medium ${activeSection === "history" ? "bg-[#00ff9d20] text-[#00ff9d]" : "text-gray-400 hover:text-white"
                            }`}
                    >
                        <Clock size={18} /> History
                    </button>
                </div>
            </div>

            {/* Right Side: User Name & Logout */}
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#00ff9d20] text-[#00ff9d] flex items-center justify-center border border-[#00ff9d40]">
                        <User size={16} />
                    </div>
                    <div className="hidden sm:block text-right">
                        <p className="text-sm font-bold text-white leading-tight">{workerInfo.fullName}</p>
                        <p className="text-[10px] text-gray-400">ID: {workerInfo.id}</p>
                    </div>
                </div>

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-left text-red-400 font-bold pt-2 p-2 rounded-xl hover:bg-red-500/10 transition-colors"
                >
                    <LogOut size={18} /> Log Out
                </button>
            </div>
        </nav>
    );
}