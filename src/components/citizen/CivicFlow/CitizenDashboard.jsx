import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    FileText, CheckCircle, Clock,
    Coins, Plus, Gift, Truck // Added Truck icon
} from "lucide-react";
import { getLoggedInUser } from "../../../utils/storage";

export default function CitizenDashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        setUser(getLoggedInUser());
    }, []);

    return (
        <div className="min-h-screen bg-[#020617] text-white font-inter flex flex-col">

            {/* Main Content */}
            <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">
                            Welcome back, {user?.username || "Citizen"}!
                        </h1>
                        <p className="text-gray-400">Track your reports and make your community better</p>
                    </div>

                    {/* Action Buttons Group */}
                    <div className="flex flex-wrap gap-4">
                        {/* Interchanged: Report Button is now first */}
                        <button
                            onClick={() => navigate("/Report")}
                            className="bg-[#00ff9d] text-black px-6 py-2.5 rounded-full font-bold hover:shadow-[0_0_15px_#00ff9d] transition-all flex items-center gap-2"
                        >
                            <Plus size={18} /> Report New Issue
                        </button>

                        {/* Schedule Button is now second, with identical styling */}
                        <button
                            onClick={() => navigate("/InstantGarbagePickup")}
                            className="bg-[#00ff9d] text-black px-6 py-2.5 rounded-full font-bold hover:shadow-[0_0_15px_#00ff9d] transition-all flex items-center gap-2"
                        >
                            <Truck size={18} /> Instant Garbage Pickup
                        </button>
                    </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    {[
                        { title: "Total Reports", value: "0", desc: "Issues reported by you", icon: <FileText size={20} /> },
                        { title: "Verified", value: "0", desc: "Successfully resolved", icon: <CheckCircle size={20} /> },
                        { title: "Pending", value: "0", desc: "In progress or assigned", icon: <Clock size={20} /> },
                        { title: "Reward Points", value: user?.ecoPoints || "0", desc: "View rewards", icon: <Coins size={20} />, textHighlight: "text-[#00ff9d]" }
                    ].map((stat, i) => (
                        <div key={i} className="bg-[#0a0f1b] border border-gray-800 p-6 rounded-2xl">
                            <div className="flex justify-between items-start mb-4 text-gray-400">
                                <h3 className="font-semibold text-white">{stat.title}</h3>
                                {stat.icon}
                            </div>
                            <p className={`text-3xl font-bold mb-1 ${stat.textHighlight || "text-white"}`}>{stat.value}</p>
                            <p className="text-xs text-gray-500">{stat.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Recent Reports Section */}
                <div className="bg-[#0a0f1b] border border-gray-800 rounded-2xl p-6 mb-8">
                    <div className="flex justify-between items-center mb-10 border-b border-gray-800 pb-4">
                        <div>
                            <h2 className="text-xl font-bold text-white">Recent Reports</h2>
                            <p className="text-sm text-gray-400">Your latest civic issue submissions</p>
                        </div>
                        <button
                            onClick={() => navigate("/TrackReport")}
                            className="text-sm border border-gray-700 px-4 py-1.5 rounded-full hover:bg-gray-800 transition"
                        >
                            View All
                        </button>
                    </div>

                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center text-gray-600 mb-4">
                            <FileText size={32} />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">No reports yet</h3>
                        <p className="text-gray-400 mb-6">Start making a difference by reporting your first issue</p>
                        <button
                            onClick={() => navigate("/Report")}
                            className="bg-[#00ff9d] text-black px-6 py-2 rounded-full font-bold hover:shadow-[0_0_15px_#00ff9d] transition-all"
                        >
                            Report an Issue
                        </button>
                    </div>
                </div>

                {/* Action Cards Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                        { title: "Report New Issue", desc: "Submit a new civic problem", icon: <Plus className="text-[#00ff9d]" size={24} />, path: "/Report" },
                        { title: "Track Reports", desc: "View all your submissions", icon: <FileText className="text-blue-400" size={24} />, path: "/TrackReport" },
                        { title: "Redeem Rewards", desc: "Use your earned points", icon: <Gift className="text-yellow-400" size={24} />, path: "/Reward" }
                    ].map((action, i) => (
                        <div
                            key={i}
                            onClick={() => navigate(action.path)}
                            className="bg-[#0a0f1b] border border-gray-800 p-6 rounded-2xl hover:border-[#00ff9d50] hover:shadow-[0_0_15px_rgba(0,255,153,0.1)] cursor-pointer transition-all group"
                        >
                            <div className="mb-4">{action.icon}</div>
                            <h3 className="font-bold text-white mb-1 group-hover:text-[#00ff9d] transition-colors">{action.title}</h3>
                            <p className="text-sm text-gray-500">{action.desc}</p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}