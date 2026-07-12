// LeaderboardAndCompetition.jsx
import {
  getLoggedInUser,
  joinCampaign,
  updateUserStats,
  hasJoinedChallenge,
} from "../../utils/storage";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler
} from "chart.js";
import { Award, Clock, Leaf, Users, Zap, Coins, Trophy, Globe } from "lucide-react";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler
);

const LeaderboardAndChallenges = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [user, setUser] = useState(getLoggedInUser());
  const [joinedChallenges, setJoinedChallenges] = useState({});
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (user?.joinedCampaigns) {
      const joined = {};
      user.joinedCampaigns.forEach((id) => (joined[id] = true));
      setJoinedChallenges(joined);
    }
  }, [user]);

  // --- Data & Options ---
  const activityData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [{
      label: "Challenges Completed",
      data: [2, 5, 4, 6, 8, 10, 9],
      borderColor: "#4ade80", // green-400
      backgroundColor: "rgba(74, 222, 128, 0.1)",
      borderWidth: 3,
      tension: 0.4,
      fill: true,
      pointBackgroundColor: "#050505",
      pointBorderColor: "#4ade80",
      pointBorderWidth: 2,
      pointRadius: 4,
    }],
  };

  const chartOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false }, ticks: { color: "#71717a" } },
      y: { grid: { color: "rgba(255,255,255,0.05)" }, ticks: { color: "#71717a" }, beginAtZero: true }
    }
  };

  const challenges = [
    { id: 1, title: "Plant 10 Trees", reward: "120 Eco Coins", time: "2 days" },
    { id: 2, title: "Recycle 5kg Plastic", reward: "80 Eco Coins", time: "2 days" },
    { id: 3, title: "Avoid Cars for a Week", reward: "150 Eco Coins", time: "3 days" },
    { id: 4, title: "Clean Your Campus", reward: "200 Eco Coins", time: "2 days" },
    { id: 5, title: "Organize Awareness Drive", reward: "250 Eco Coins", time: "4 days" },
    { id: 6, title: "Water Conservation Pledge", reward: "100 Eco Coins", time: "2 days" },
  ];

  const leaderboard = [
    { name: "Isha Mehta", school: "La Martiniere", avatar: "https://randomuser.me/api/portraits/women/44.jpg", coins: 2950, rank: 2 },
    { name: "Aarav Sharma", school: "Delhi Public School", avatar: "https://randomuser.me/api/portraits/men/32.jpg", coins: 3280, rank: 1 },
    { name: "Rohit Verma", school: "Modern School", avatar: "https://randomuser.me/api/portraits/men/12.jpg", coins: 2670, rank: 3 },
  ];

  const handleJoinChallenge = (challenge) => {
    setSelectedChallenge(challenge);
    setShowModal(true);
  };

  const confirmJoin = () => {
    // joinCampaign(selectedChallenge.id);
    // updateUserStats(50, 100);
    // setUser(getLoggedInUser());
    setJoinedChallenges({ ...joinedChallenges, [selectedChallenge.id]: true });
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 md:p-12 relative overflow-hidden font-sans">
      {/* 🟢 EXACT ORIGINAL NEON HERO 🟢 */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mt-6 mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-[#39ff14] drop-shadow-[0_0_15px_#39ff14]">
          Evora Leaderboard & Competitions 🌱
        </h1>
        <p className="text-gray-400 mt-4 text-lg">
          Track your journey, rise on the leaderboard, and take on eco challenges!
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        {/* Modern Personal Dashboard */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-green-500/10 rounded-xl text-green-400"><Leaf size={24} /></div>
            <h2 className="text-2xl font-bold">Your Eco Overview</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
            <div className="bg-[#0a0a0a] p-5 rounded-2xl border border-zinc-800 flex flex-col items-center text-center">
              <Trophy className="text-yellow-400 mb-2" size={28} />
              <h3 className="text-zinc-500 text-sm font-semibold uppercase tracking-wider mb-1">Badges</h3>
              <p className="text-2xl font-black">4 Earned</p>
            </div>
            <div className="bg-[#0a0a0a] p-5 rounded-2xl border border-zinc-800 flex flex-col items-center text-center">
              <Zap className="text-blue-400 mb-2" size={28} />
              <h3 className="text-zinc-500 text-sm font-semibold uppercase tracking-wider mb-1">Total EXP</h3>
              <p className="text-2xl font-black">{user ? user.ecoXP : 1450}</p>
            </div>
            <div className="bg-[#0a0a0a] p-5 rounded-2xl border border-zinc-800 flex flex-col items-center text-center col-span-2 md:col-span-1">
              <Coins className="text-green-400 mb-2" size={28} />
              <h3 className="text-zinc-500 text-sm font-semibold uppercase tracking-wider mb-1">EcoCoins</h3>
              <p className="text-2xl font-black text-green-400">{user ? user.ecoPoints : 320}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-zinc-400 text-sm font-semibold uppercase tracking-wider mb-4">Challenge Activity</h3>
              <Line data={activityData} options={chartOptions} />
            </div>
            <div>
              <h3 className="text-zinc-400 text-sm font-semibold uppercase tracking-wider mb-4">Daily Consistency</h3>
              <div className="flex flex-wrap gap-1.5 bg-[#0a0a0a] p-4 rounded-2xl border border-zinc-800">
                {Array.from({ length: 84 }).map((_, i) => {
                  const intensity = Math.floor(Math.random() * 4);
                  return (
                    <div key={i} className={`w-3.5 h-3.5 rounded-[3px] transition-colors duration-300 hover:scale-125 cursor-pointer ${intensity === 0 ? "bg-zinc-800" :
                      intensity === 1 ? "bg-green-900/60" :
                        intensity === 2 ? "bg-green-600" : "bg-green-400"
                      }`}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Modern Podium Leaderboard */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 flex flex-col justify-end relative overflow-hidden">
          <h2 className="text-2xl font-bold mb-10 text-center relative z-10 flex items-center justify-center gap-2">
            <Users className="text-green-400" /> State Top 3
          </h2>

          <div className="flex justify-center items-end gap-2 md:gap-4 h-64 relative z-10">
            {leaderboard.map((person) => (
              <motion.div
                key={person.rank}
                initial={{ height: 0 }}
                animate={{ height: person.rank === 1 ? '100%' : person.rank === 2 ? '80%' : '65%' }}
                className={`relative w-24 rounded-t-2xl flex flex-col justify-start pt-12 items-center text-center border-t border-x ${person.rank === 1 ? "bg-gradient-to-t from-yellow-900/20 to-yellow-500/20 border-yellow-500/50" :
                  person.rank === 2 ? "bg-gradient-to-t from-zinc-800/20 to-zinc-400/20 border-zinc-400/50" :
                    "bg-gradient-to-t from-orange-900/20 to-orange-500/20 border-orange-500/50"
                  }`}
              >
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
                  <img src={person.avatar} alt={person.name} className={`w-16 h-16 rounded-full border-4 object-cover ${person.rank === 1 ? "border-yellow-400" : person.rank === 2 ? "border-zinc-300" : "border-orange-400"
                    }`} />
                  {person.rank === 1 && <div className="absolute -top-3 -right-2 text-2xl drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]">👑</div>}
                </div>

                <h3 className="font-bold text-sm mt-4 text-white leading-tight px-1">{person.name}</h3>
                <p className="text-xs font-black mt-2 text-green-400">{person.coins}</p>
              </motion.div>
            ))}
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-32 bg-green-500/10 blur-3xl pointer-events-none" />
        </div>
      </div>

      {/* Live Marquee */}
      <section className="mb-12 bg-zinc-900/50 backdrop-blur-sm rounded-2xl py-4 border border-zinc-800 overflow-hidden relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#050505] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#050505] to-transparent z-10" />

        <div className="flex items-center gap-4 px-6 relative z-0" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <span className="shrink-0 text-green-400 font-bold border-r border-zinc-700 pr-4">⚡ LIVE</span>
          <motion.div animate={{ x: paused ? 0 : ["0%", "-100%"] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="flex gap-12 text-zinc-300 text-sm font-medium whitespace-nowrap">
            {[
              "Ananya S. completed 'Clean Park Drive' 🧹", "Rohan V. planted 10 trees in Dehradun 🌳",
              "Kavya S. recycled 5kg plastic waste ♻️", "Aman P. joined 'Save Water' campaign 💧",
              "Sneha J. completed 'No Car Day' 🚲", "Raj M. hosted an eco-awareness event 🎤"
            ].map((text, i) => <span key={i}>{text}</span>)}
          </motion.div>
        </div>
      </section>


      {/* Modern Challenges Grid */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-white mb-6">Trending Challenges</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.map((c) => {
            const isJoined = joinedChallenges[c.id];
            return (
              <motion.div key={c.id} whileHover={{ y: -5 }} className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl group hover:border-green-500/40 transition-all flex flex-col">
                <h3 className="text-xl font-bold text-white mb-2">{c.title}</h3>
                <p className="text-zinc-400 text-sm mb-6 flex-grow">Complete this task within the time limit to earn rewards.</p>

                <div className="flex items-center justify-between mt-auto">
                  <div className="flex flex-col">
                    <span className="text-green-400 font-bold text-sm">+{c.reward}</span>
                    <span className="text-zinc-500 text-xs flex items-center gap-1 mt-1"><Clock size={12} /> {c.time}</span>
                  </div>
                  <button
                    onClick={() => handleJoinChallenge(c)}
                    disabled={isJoined}
                    className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${isJoined ? "bg-zinc-800 text-zinc-500 cursor-not-allowed" : "bg-white text-black hover:bg-green-400 group-hover:shadow-[0_0_15px_rgba(74,222,128,0.3)]"
                      }`}
                  >
                    {isJoined ? "Active" : "Accept"}
                  </button>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-zinc-900 border border-zinc-700 rounded-3xl p-8 w-[90%] max-w-md text-center shadow-2xl">
            <h2 className="text-2xl mb-2 font-bold text-white">Accept Challenge</h2>
            <p className="text-zinc-400 mb-6">Are you ready to commit to <span className="text-green-400 font-semibold">{selectedChallenge.title}</span>?</p>

            <div className="bg-[#050505] p-4 rounded-xl mb-6 border border-zinc-800">
              <p className="text-sm text-zinc-500 uppercase tracking-wide mb-1">Potential Reward</p>
              <p className="text-xl text-green-400 font-bold">{selectedChallenge.reward}</p>
            </div>

            <div className="flex gap-4">
              <button onClick={() => setShowModal(false)} className="flex-1 py-3 rounded-xl font-bold text-zinc-300 bg-zinc-800 hover:bg-zinc-700 transition-colors">
                Cancel
              </button>
              <button onClick={confirmJoin} className="flex-1 py-3 rounded-xl font-bold text-black bg-green-500 hover:bg-green-400 transition-colors">
                I'm Ready
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* 🌍 RESTORED STATE ENVIRONMENTAL IMPACT */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-12 bg-zinc-900 border border-zinc-800 p-8 rounded-3xl shadow-xl"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400"><Globe size={24} /></div>
          <h2 className="text-2xl font-bold text-white">State Environmental Impact</h2>
        </div>
        <p className="text-zinc-400 text-sm mb-8 max-w-2xl">
          A quick look at how your state’s green actions are reducing
          environmental damage and improving sustainability this month.
        </p>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
          {[
            { label: "Air Pollution Reduced", value: 72, desc: "Cleaner air quality due to increased tree plantation and reduced vehicle use." },
            { label: "Water Conservation", value: 65, desc: "Improved water-saving practices and awareness in schools." },
            { label: "Plastic Waste Reduced", value: 80, desc: "High reduction achieved through active recycling drives." },
            { label: "E-Waste Managed", value: 58, desc: "Collection campaigns and recycling centers are growing steadily." },
            { label: "Energy Saved", value: 75, desc: "Lower electricity consumption through awareness and green tech." },
          ].map((impact, index) => (
            <div key={index} className="flex flex-col">
              <div className="flex justify-between mb-2">
                <span className="text-zinc-200 text-sm font-semibold">{impact.label}</span>
                <span className="text-green-400 text-sm font-bold">{impact.value}%</span>
              </div>
              <div className="w-full bg-zinc-800 rounded-full h-2 mb-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${impact.value}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]"
                ></motion.div>
              </div>
              <p className="text-zinc-500 text-xs">{impact.desc}</p>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default LeaderboardAndChallenges;