import React from "react";
import { motion } from "framer-motion";
import {
    Camera,
    Brain,
    MapPin,
    CheckCircle,
    Award,
    AlertTriangle,
    Trash2,
    LightbulbOff,
    CarFront,
    VolumeX,
    Droplets,
    Building2,
    ShieldCheck,
    Clock,
    TrendingUp,
    Users,
    User,
    HardHat,
    LayoutDashboard,
    ArrowRight
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom"; // ✅ Added useNavigate

const CivicFlow = () => {
    const navigate = useNavigate(); // ✅ Initialize navigation

    // ✅ Function to handle smooth scrolling for "Learn More"
    const scrollToHowItWorks = () => {
        const element = document.getElementById("how-it-works");
        if (element) {
            // Offset for the fixed navbar
            const yOffset = -80;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
        }
    };

    return (
        <div className="min-h-screen bg-[#020617] text-white font-inter overflow-hidden">

            {/* 1. HERO SECTION */}
            <section className="relative pt-32 pb-16 px-6 max-w-7xl mx-auto text-center flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-block px-4 py-1.5 rounded-full border border-[#00ff9d40] bg-[#00ff9d10] text-[#00ff9d] text-sm font-semibold mb-6"
                >
                    ✨ AI-Powered Civic Action
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6"
                >
                    See it. <span className="text-[#00ff9d] drop-shadow-[0_0_15px_rgba(0,255,153,0.5)]">Report it.</span> Resolve it.
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-400 text-lg md:text-xl max-w-2xl mb-10"
                >
                    Empowering citizens to build cleaner, safer, and smarter cities through AI-driven issue reporting and tracking.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-col sm:flex-row gap-4"
                >
                    {/* ✅ Change 1: Redirects to CitizenDashboard */}
                    <button
                        onClick={() => navigate("/CitizenDashboard")}
                        className="px-8 py-3 rounded-full bg-[#00ff9d] text-black font-bold hover:shadow-[0_0_20px_#00ff9d] transition-all active:scale-95"
                    >
                        Report an Issue
                    </button>
                    {/* ✅ Change 2: Scrolls to How It Works */}
                    <button
                        onClick={scrollToHowItWorks}
                        className="px-8 py-3 rounded-full border border-gray-600 text-gray-300 hover:border-[#00ff9d] hover:text-[#00ff9d] transition-all"
                    >
                        Learn More
                    </button>
                </motion.div>
            </section>

            {/* 1.5 EXPLORE ALL INTERFACES */}
            <section className="max-w-5xl mx-auto px-6 mt-[-2rem] mb-12 relative z-10">
                <div className="bg-[#0c1320] border border-gray-800 rounded-3xl p-8 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                        <h2 className="text-xl md:text-2xl font-bold text-white">Explore All Interfaces</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                        {/* ✅ Change 3: Citizen View redirect */}
                        <div
                            onClick={() => navigate("/CitizenDashboard")}
                            className="bg-[#0a0f1b] border border-gray-800 p-6 rounded-2xl hover:border-[#00ff9d50] hover:shadow-[0_0_15px_rgba(0,255,153,0.1)] transition-all group cursor-pointer"
                        >
                            <div className="w-12 h-12 rounded-full bg-[#00ff9d10] flex items-center justify-center text-[#00ff9d] mb-4 group-hover:scale-110 transition-transform">
                                <User size={24} />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">Citizen View</h3>
                            <p className="text-sm text-gray-400">Report issues, track live status, and earn EcoCoins for your contributions.</p>
                        </div>

                        {/* ✅ Change 3: Worker View redirect */}
                        <div
                            onClick={() => navigate("/WorkerDashboard")}
                            className="bg-[#0a0f1b] border border-gray-800 p-6 rounded-2xl hover:border-[#00ff9d50] hover:shadow-[0_0_15px_rgba(0,255,153,0.1)] transition-all group cursor-pointer"
                        >
                            <div className="w-12 h-12 rounded-full bg-[#00ff9d10] flex items-center justify-center text-[#00ff9d] mb-4 group-hover:scale-110 transition-transform">
                                <HardHat size={24} />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">Worker View</h3>
                            <p className="text-sm text-gray-400">Receive assigned tasks, navigate to locations, and upload resolution proof.</p>
                        </div>

                        {/* ✅ Change 3: Admin View redirect */}
                        <div
                            onClick={() => navigate("/AdminDashboard")}
                            className="bg-[#0a0f1b] border border-gray-800 p-6 rounded-2xl hover:border-[#00ff9d50] hover:shadow-[0_0_15px_rgba(0,255,153,0.1)] transition-all group cursor-pointer"
                        >
                            <div className="w-12 h-12 rounded-full bg-[#00ff9d10] flex items-center justify-center text-[#00ff9d] mb-4 group-hover:scale-110 transition-transform">
                                <LayoutDashboard size={24} />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">Admin View</h3>
                            <p className="text-sm text-gray-400">Monitor city-wide analytics, auto-assign workers, and verify completed tasks.</p>
                        </div>

                    </div>
                </div>
            </section>

            {/* 2. STATS ROW */}
            <section className="max-w-6xl mx-auto px-6 py-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-y border-gray-800 py-10 text-center">
                    {[
                        { value: "10K+", label: "Issues Resolved" },
                        { value: "5K+", label: "Active Citizens" },
                        { value: "98%", label: "Satisfaction Rate" },
                        { value: "24hrs", label: "Avg. Response Time" },
                    ].map((stat, i) => (
                        <div key={i}>
                            <h3 className="text-4xl font-black text-white mb-2">{stat.value}</h3>
                            <p className="text-sm text-gray-400 font-medium uppercase tracking-wider">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* 3. HOW IT WORKS (Vertical Steps) */}
            {/* ✅ Added id="how-it-works" here for smooth scrolling */}
            <section id="how-it-works" className="max-w-6xl mx-auto px-6 py-16 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">How EvoraFlow Works</h2>
                <p className="text-gray-400 mb-12">From spotting an issue to earning rewards in 5 simple steps.</p>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                    {[
                        { icon: <Camera size={32} />, title: "1. Capture", desc: "Snap a clear photo of the civic issue." },
                        { icon: <Brain size={32} />, title: "2. AI Analyzes", desc: "Our AI auto-detects the problem category." },
                        { icon: <MapPin size={32} />, title: "3. Smart Routing", desc: "Issue is routed to the exact local authority." },
                        { icon: <CheckCircle size={32} />, title: "4. Status Updates", desc: "Track progress until it's officially resolved." },
                        { icon: <Award size={32} />, title: "5. Earn Rewards", desc: "Get EcoCoins for making your city better." }
                    ].map((step, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -10, borderColor: "#00ff9d" }}
                            className="bg-[#0c1320] border border-gray-800 rounded-3xl p-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,153,0.15)]"
                        >
                            <div className="w-16 h-16 rounded-full bg-[#00ff9d15] text-[#00ff9d] flex items-center justify-center mb-6">
                                {step.icon}
                            </div>
                            <h3 className="text-lg font-bold text-white mb-3">{step.title}</h3>
                            <p className="text-sm text-gray-400 leading-relaxed">{step.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* 4. WHAT YOU CAN REPORT (Grid) */}
            <section className="max-w-6xl mx-auto px-6 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">What You Can Report</h2>
                    <p className="text-gray-400">Our AI model currently supports the following categories.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { icon: <AlertTriangle />, title: "Potholes", desc: "Deep cracks or broken asphalt." },
                        { icon: <Trash2 />, title: "Waste Overflow", desc: "Uncollected garbage or illegal dumping." },
                        { icon: <LightbulbOff />, title: "Streetlights", desc: "Broken, flickering, or unlit poles." },
                        { icon: <CarFront />, title: "Abandoned Vehicles", desc: "Cars left rotting on public roads." },
                        { icon: <VolumeX />, title: "Noise Pollution", desc: "Construction or loud illegal events." },
                        { icon: <Building2 />, title: "Damaged Property", desc: "Broken benches, parks, or bus stops." },
                        { icon: <Droplets />, title: "Water Leaks", desc: "Burst pipes or overflowing drains." },
                        { icon: <Users />, title: "Civic Nuisance", desc: "Other public disturbances." }
                    ].map((item, i) => (
                        <div key={i} className="bg-[#0a0f1b] border border-gray-800 p-6 rounded-2xl flex flex-col hover:border-[#00ff9d50] transition-colors group">
                            <div className="text-[#00ff9d] mb-4 group-hover:scale-110 transition-transform origin-left">
                                {item.icon}
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                            <p className="text-sm text-gray-500">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* 5. WHY CHOOSE US */}
            <section className="max-w-6xl mx-auto px-6 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose EvoraFlow</h2>
                    <p className="text-gray-400">The smartest way to interact with your local government.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                        { icon: <TrendingUp className="text-[#00ff9d]" />, title: "Faster Resolutions", desc: "AI instantly directs your complaint to the right desk, cutting out the middleman." },
                        { icon: <ShieldCheck className="text-[#00ff9d]" />, title: "Transparent Tracking", desc: "No more black holes. See exactly when your ticket is viewed, assigned, and fixed." },
                        { icon: <CheckCircle className="text-[#00ff9d]" />, title: "Verified Impacts", desc: "Before/After photo verification ensures the job was actually done right." },
                        { icon: <Award className="text-[#00ff9d]" />, title: "Community Driven", desc: "Earn points, level up your profile, and compete on the active citizen leaderboard." }
                    ].map((feature, i) => (
                        <div key={i} className="flex gap-6 bg-[#0c1320] border border-gray-800 p-8 rounded-3xl items-start">
                            <div className="p-4 bg-[#00ff9d10] rounded-xl shrink-0">
                                {feature.icon}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 6. CTA BANNER */}
            <section id="report-issue" className="max-w-5xl mx-auto px-6 py-16">
                <div className="bg-gradient-to-br from-[#0c1320] to-[#041a10] border border-[#00ff9d50] rounded-[2.5rem] p-12 text-center shadow-[0_0_40px_rgba(0,255,153,0.15)] relative overflow-hidden">
                    {/* Subtle background glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#00ff9d] opacity-5 blur-[100px] pointer-events-none"></div>

                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 relative z-10">Ready to Make a Difference?</h2>
                    <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto relative z-10">
                        Join thousands of active citizens making their neighborhoods safer, cleaner, and smarter.
                    </p>
                    {/* ✅ Change 4: Redirects to CitizenDashboard */}
                    <button
                        onClick={() => navigate("/CitizenDashboard")}
                        className="relative z-10 px-10 py-4 rounded-full bg-white text-black font-extrabold text-lg hover:bg-[#00ff9d] hover:shadow-[0_0_20px_#00ff9d] transition-all active:scale-95 flex items-center gap-2 mx-auto"
                    >
                        Report Your First Issue <Camera size={20} />
                    </button>
                </div>
            </section>

        </div>
    );
};

export default CivicFlow;