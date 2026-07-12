import React, { useState, useEffect } from "react";
import {
    Gift, Coins, Car, Droplets, Zap,
    ParkingCircle, Train, Building, Lock
} from "lucide-react";
import { getLoggedInUser } from "../../../utils/storage"; // Adjust path as needed

export default function Reward() {
    const [activeTab, setActiveTab] = useState("redeem");
    const [userBalance, setUserBalance] = useState(850); // Default to 850 for the mockup look

    // Fetch real user balance if available
    useEffect(() => {
        const user = getLoggedInUser();
        if (user && user.ecoPoints !== undefined) {
            setUserBalance(user.ecoPoints);
        }
    }, []);

    // Mock data based exactly on your screenshot
    const rewards = [
        {
            id: 1, title: "FASTag Toll Discount", desc: "₹100 toll discount on national highways",
            category: "Transportation", value: "₹100", cost: 500, icon: <Car size={24} />
        },
        {
            id: 2, title: "Water Bill Discount", desc: "10% off on next water bill - DJB",
            category: "Utilities", value: "10%", cost: 300, icon: <Droplets size={24} />
        },
        {
            id: 3, title: "Electricity Bill Discount", desc: "₹150 off on electricity bill - NDMC/MCD",
            category: "Utilities", value: "₹150", cost: 600, icon: <Zap size={24} />
        },
        {
            id: 4, title: "Municipal Parking Pass", desc: "Free parking for 1 month - All MCD Parking",
            category: "Transportation", value: "1 month", cost: 800, icon: <ParkingCircle size={24} />
        },
        {
            id: 5, title: "Public Transport Pass", desc: "20% off on Delhi Metro/DTC monthly pass",
            category: "Transportation", value: "20%", cost: 400, icon: <Train size={24} />
        },
        {
            id: 6, title: "Property Tax Rebate", desc: "5% off on annual property tax - MCD",
            category: "Civic", value: "5%", cost: 1000, icon: <Building size={24} />
        },
    ];

    return (
        <div className="min-h-screen bg-[#020617] text-white font-inter flex flex-col">

            {/* Main Content Area */}
            <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-6 pt-32 pb-20">

                {/* Header Section */}
                <div className="mb-8 text-center md:text-left">
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Incentives & Rewards</h1>
                    <p className="text-gray-400">Redeem your EcoCoins for government benefits and exclusive perks</p>
                </div>

                {/* Balance Card */}
                <div className="bg-gradient-to-r from-[#00ff9d10] to-[#0a0f1b] border border-[#00ff9d40] rounded-3xl p-8 mb-10 flex flex-col md:flex-row justify-between items-center shadow-[0_0_30px_rgba(0,255,153,0.1)] relative overflow-hidden">
                    <div className="absolute -right-10 -top-10 text-[#00ff9d] opacity-10">
                        <Coins size={150} />
                    </div>

                    <div className="relative z-10 text-center md:text-left w-full">
                        <p className="text-gray-300 font-medium mb-1">Available Balance</p>
                        <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                            <Coins size={36} className="text-[#00ff9d]" />
                            <span className="text-5xl font-extrabold text-white">{userBalance}</span>
                            <span className="text-xl text-[#00ff9d] font-semibold mt-3">EcoCoins</span>
                        </div>
                        <p className="text-sm text-gray-400 mt-2">
                            Total Earned: <span className="text-white font-medium">1200</span> <span className="mx-2 text-gray-700">|</span> Spent: <span className="text-white font-medium">350</span>
                        </p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-800 mb-8 overflow-x-auto no-scrollbar">
                    {[
                        { id: "redeem", label: "Redeem" },
                        { id: "coupons", label: "My Coupons (0)" },
                        { id: "transactions", label: "Transactions" }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`pb-4 px-6 font-semibold whitespace-nowrap transition-colors relative ${activeTab === tab.id ? "text-[#00ff9d]" : "text-gray-500 hover:text-gray-300"
                                }`}
                        >
                            {tab.label}
                            {activeTab === tab.id && (
                                <span className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-[#00ff9d] shadow-[0_0_10px_#00ff9d]"></span>
                            )}
                        </button>
                    ))}
                </div>

                {/* Rewards Grid */}
                {activeTab === "redeem" ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {rewards.map((reward) => {
                            const canAfford = userBalance >= reward.cost;

                            return (
                                <div key={reward.id} className="bg-[#0a0f1b] border border-gray-800 rounded-2xl p-6 flex flex-col hover:border-[#00ff9d50] transition-colors group relative overflow-hidden">

                                    {/* Top Row: Icon & Cost */}
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center text-[#00ff9d] group-hover:scale-110 transition-transform">
                                            {reward.icon}
                                        </div>
                                        <div className="bg-[#00ff9d15] border border-[#00ff9d30] text-[#00ff9d] px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                                            <Coins size={14} /> {reward.cost}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-xl font-bold text-white mb-2">{reward.title}</h3>
                                    <p className="text-sm text-gray-400 mb-6 flex-grow">{reward.desc}</p>

                                    {/* Meta Details */}
                                    <div className="space-y-3 mb-6">
                                        <div className="flex justify-between items-center text-sm border-b border-gray-800 pb-2">
                                            <span className="text-gray-500">Category:</span>
                                            <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-xs font-medium">{reward.category}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-gray-500">Value:</span>
                                            <span className="text-white font-bold">{reward.value}</span>
                                        </div>
                                    </div>

                                    {/* Redeem Button */}
                                    <button
                                        disabled={!canAfford}
                                        className={`w-full py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${canAfford
                                                ? "bg-[#00ff9d] text-black hover:shadow-[0_0_20px_rgba(0,255,153,0.4)]"
                                                : "bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700"
                                            }`}
                                    >
                                        {canAfford ? (
                                            <>
                                                <Gift size={18} /> Redeem Now
                                            </>
                                        ) : (
                                            <>
                                                <Lock size={18} /> Insufficient EcoCoins
                                            </>
                                        )}
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    /* Empty State for other tabs */
                    <div className="flex flex-col items-center justify-center py-20 text-center bg-[#0a0f1b] border border-gray-800 rounded-3xl">
                        <Gift size={48} className="text-gray-700 mb-4" />
                        <h2 className="text-xl font-bold text-white mb-2">No records found</h2>
                        <p className="text-gray-500">You haven't made any transactions here yet.</p>
                    </div>
                )}

            </main>

        </div>
    );
}