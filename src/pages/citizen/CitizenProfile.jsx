import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    User, MapPin, ArrowLeft, CheckCircle2, TrendingUp,
    Droplets, TreePine, Zap, Target, Award, Shield,
    Cpu, Users, Building2, ExternalLink, Recycle,
    Clock, ChevronRight, Leaf, ArrowDownRight, ArrowUpRight, Gift,
    Share2, Download, Loader2
} from "lucide-react";

// 🔥 PDF Export Libraries
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

// 🔥 Firebase
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

// --- HELPER COMPONENT: Animated Counter ---
function AnimatedCounter({ value, duration = 2000 }) {
    const [count, setCount] = useState(0);
    const countRef = useRef(0);
    const startTimeRef = useRef(null);

    useEffect(() => {
        const animate = (timestamp) => {
            if (!startTimeRef.current) startTimeRef.current = timestamp;
            const progress = Math.min((timestamp - startTimeRef.current) / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 4);
            const currentCount = Math.floor(easeOut * value);

            if (currentCount !== countRef.current) {
                countRef.current = currentCount;
                setCount(currentCount);
            }
            if (progress < 1) requestAnimationFrame(animate);
            else setCount(value);
        };
        const timer = setTimeout(() => requestAnimationFrame(animate), 100);
        return () => clearTimeout(timer);
    }, [value, duration]);

    return <>{count.toLocaleString()}</>;
}

// --- HELPER COMPONENT: Score Ring ---
function ScoreRing({ score, maxScore = 10 }) {
    const percentage = (score / maxScore) * 100;
    const circumference = 2 * Math.PI * 45;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <div className="relative w-32 h-32 mx-auto">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="6" className="text-gray-800" />
                <circle
                    cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round"
                    className="text-[#00ff9d] transition-all duration-1000 ease-out"
                    style={{ strokeDasharray: circumference, strokeDashoffset: strokeDashoffset }}
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-white">{score}</span>
                <span className="text-xs text-gray-400">/ {maxScore}</span>
            </div>
        </div>
    );
}

export default function CitizenProfile() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);
    const [isExporting, setIsExporting] = useState(false);

    // Profile Data
    const [profileData, setProfileData] = useState({
        username: "Loading...",
        ecoCoins: 0,
        zone: "Dehradun, Uttarakhand"
    });

    // 1. Fetch User Data
    useEffect(() => {
        setMounted(true);
        const fetchProfile = async () => {
            try {
                const sessionData = localStorage.getItem("evora_loggedInUser");
                if (!sessionData) {
                    navigate("/CitizenLogin");
                    return;
                }
                const parsedSession = JSON.parse(sessionData);
                const uid = parsedSession.uid;

                if (uid) {
                    const userDoc = await getDoc(doc(db, "users", uid));
                    if (userDoc.exists()) {
                        const data = userDoc.data();
                        setProfileData({
                            username: data.username || parsedSession.username,
                            ecoCoins: data.ecoCoins || parsedSession.ecoPoints || 12847,
                            zone: data.zone || "Dehradun, Uttarakhand"
                        });
                    }
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [navigate]);

    // 🔥 HANDLE SHARE
    const handleShare = async () => {
        const shareData = {
            title: 'My EVO Profile',
            text: `Check out my verified environmental impact on EVORA! I've earned ${profileData.ecoCoins} EcoCoins and secured a top City Rank! 🌱`,
            url: window.location.href
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
                alert("Profile summary copied to clipboard! Ready to paste.");
            }
        } catch (err) {
            console.error("Error sharing:", err);
        }
    };

    // 🔥 STRUCTURED PDF EXPORT (Native jsPDF + AutoTable)
    const handleExportPDF = () => {
        setIsExporting(true);

        try {
            const doc = new jsPDF("p", "pt", "a4");
            const primaryColor = [0, 200, 150]; // Neon Green variant for PDF
            const darkColor = [30, 41, 59]; // Slate

            // Helper for page footers
            const addFooter = () => {
                const pageCount = doc.internal.getNumberOfPages();
                for (let i = 1; i <= pageCount; i++) {
                    doc.setPage(i);
                    doc.setFontSize(9);
                    doc.setTextColor(150);
                    doc.text("EVO Profile - Your Verified Environmental Impact Record", 40, doc.internal.pageSize.height - 30);
                    doc.text("AI + Blockchain Verified | Trusted by Organizations Worldwide", 40, doc.internal.pageSize.height - 18);
                    const dateStr = `Generated: ${new Date().toLocaleDateString()}`;
                    doc.text(dateStr, doc.internal.pageSize.width - 40 - doc.getTextWidth(dateStr), doc.internal.pageSize.height - 30);
                }
            };

            // --- PAGE 1: Summary ---
            // Header
            doc.setFont("helvetica", "bold");
            doc.setFontSize(24);
            doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
            doc.text("EVO Profile", 40, 50);

            doc.setFont("helvetica", "normal");
            doc.setFontSize(12);
            doc.setTextColor(100);
            doc.text("Your Environmental Impact Record - Verified & Trusted", 40, 68);

            // 1. Profile Information Table
            doc.setFontSize(14);
            doc.setFont("helvetica", "bold");
            doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
            doc.text("Profile Information", 40, 100);

            autoTable(doc, {
                startY: 110,
                body: [
                    ["Name:", profileData.username],
                    ["Member ID:", `EVR-${new Date().getFullYear()}-001337`],
                    ["Member Since:", "March 2026"],
                    ["PlanetScore:", "9.2/10 (LEGENDARY)"],
                    ["Global Rank:", "#847 out of 2.4M users (Top 0.03%)"],
                    ["Status:", "AI + Blockchain Verified"],
                    ["Badge:", "Founding Member | Elite Environmental Champion"]
                ],
                theme: 'plain',
                styles: { fontSize: 11, cellPadding: 6 },
                columnStyles: {
                    0: { fontStyle: 'bold', textColor: darkColor, cellWidth: 120 },
                    1: { textColor: [50, 50, 50] }
                }
            });

            let finalY = doc.lastAutoTable.finalY + 30;

            // 2. Real-Time Impact Metrics Table
            doc.setFontSize(14);
            doc.setFont("helvetica", "bold");
            doc.text("Real-Time Impact Metrics", 40, finalY);

            autoTable(doc, {
                startY: finalY + 10,
                head: [["Metric", "Total Impact", "Recent Growth"]],
                body: [
                    ["Total CO2 Saved", "4,892 kg", "+324 kg this week (+18%)"],
                    ["Trees Equivalent", "243 trees", "+28 this month (+12%)"],
                    ["Water Conserved", "8,750 liters", "+1,240 L this month (+24%)"],
                    ["Community Impact", "2,456 people", "+187 new people (+31%)"],
                    ["Energy Saved", "1,240 kWh", "+89 kWh this week (+15%)"]
                ],
                theme: 'grid',
                headStyles: { fillColor: primaryColor, textColor: 255, fontStyle: 'bold' },
                styles: { fontSize: 10, cellPadding: 8 },
                columnStyles: {
                    0: { fontStyle: 'bold', textColor: darkColor },
                    2: { textColor: [0, 150, 0] } // Green text for growth
                }
            });

            finalY = doc.lastAutoTable.finalY + 30;

            // 3. Multi-Layer Verification System
            doc.setFontSize(14);
            doc.setFont("helvetica", "bold");
            doc.text("Multi-Layer Verification System", 40, finalY);

            autoTable(doc, {
                startY: finalY + 10,
                body: [
                    ["AI Neural Verification", "Elite Level 9"],
                    ["Immutable Eco-Chain Record", "Blockchain Verified"],
                    ["Community Endorsed", "67 Peer-Verified Activities (Platinum)"],
                    ["Government Certified", "National Recognition"],
                    ["SDG Champion", "Contributing to 10/17 UN SDGs (Gold)"]
                ],
                theme: 'striped',
                headStyles: { fillColor: [240, 240, 240] },
                styles: { fontSize: 10, cellPadding: 6 },
                columnStyles: {
                    0: { fontStyle: 'bold', textColor: darkColor, cellWidth: 200 }
                }
            });

            finalY = doc.lastAutoTable.finalY + 30;

            // 4. UN SDG Contribution Score
            doc.setFontSize(14);
            doc.setFont("helvetica", "bold");
            doc.text("UN SDG Contribution Score (90.4% Average)", 40, finalY);

            autoTable(doc, {
                startY: finalY + 10,
                body: [
                    ["SDG 13: Climate Action", "99%"],
                    ["SDG 12: Responsible Consumption", "97%"],
                    ["SDG 3: Good Health", "94%"],
                    ["SDG 15: Life on Land", "93%"]
                ],
                theme: 'plain',
                styles: { fontSize: 10, cellPadding: 4 },
                columnStyles: {
                    0: { fontStyle: 'bold', textColor: darkColor, cellWidth: 250 },
                    1: { fontStyle: 'bold', textColor: primaryColor }
                }
            });

            // --- PAGE 2: Timeline ---
            doc.addPage();

            doc.setFontSize(16);
            doc.setFont("helvetica", "bold");
            doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
            doc.text("Blockchain-Verified Activity Timeline", 40, 50);

            autoTable(doc, {
                startY: 70,
                head: [["Date", "Activity & Impact", "Verification Method"]],
                body: [
                    ["March 7, 2026", "National Hackathon Environmental Challenge\nImpact: Top 10 Finalist", "AI + Government Verified"],
                    ["March 5, 2026", "Urban Forest Initiative Launch\nImpact: 1,000 trees pledged", "Blockchain Verified"],
                    ["March 1, 2026", "Yamuna River Cleanup Drive\nImpact: 890 kg waste collected", "AI Verified"],
                    ["February 25, 2026", "Solar Panel Installation Workshop\nImpact: 45 panels installed", "Community Verified"],
                    ["February 20, 2026", "E-Waste Collection Campaign\nImpact: 2.4 tons recycled", "Government Verified"],
                    ["February 14, 2026", "Plastic-Free Campus Initiative\nImpact: 100% plastic-free zones", "AI + Community Verified"]
                ],
                theme: 'grid',
                headStyles: { fillColor: darkColor, textColor: 255 },
                styles: { fontSize: 10, cellPadding: 10, valign: 'middle' },
                columnStyles: {
                    0: { cellWidth: 100, fontStyle: 'bold' },
                    1: { cellWidth: 250 },
                    2: { textColor: primaryColor, fontStyle: 'bold' }
                }
            });

            addFooter();

            // Save the document
            doc.save(`EVO_Profile_${profileData.username.replace(/\s+/g, '_')}.pdf`);

        } catch (error) {
            console.error("Error generating PDF:", error);
            alert("Failed to export PDF.");
        } finally {
            setIsExporting(false);
        }
    };

    // Static Data for UI rendering
    const metrics = [
        { icon: TrendingUp, label: 'Total CO2 Saved', value: 4892, unit: 'kg', change: '+18%', changeLabel: 'this month', description: 'Carbon emissions prevented', iconColor: 'text-emerald-500', iconBg: 'bg-emerald-500/10' },
        { icon: TreePine, label: 'Trees Planted', value: 243, unit: 'trees', change: '+12%', changeLabel: 'this month', description: 'Direct planting & offsets', iconColor: 'text-green-600', iconBg: 'bg-green-600/10' },
        { icon: Droplets, label: 'Water Conserved', value: 8750, unit: 'L', change: '+24%', changeLabel: 'this month', description: 'Through conservation efforts', iconColor: 'text-sky-500', iconBg: 'bg-sky-500/10' },
        { icon: Zap, label: 'Energy Saved', value: 1240, unit: 'kWh', change: '+15%', changeLabel: 'this month', description: 'Renewable & efficiency', iconColor: 'text-amber-500', iconBg: 'bg-amber-500/10' }
    ];

    const activities = [
        { date: 'Mar 8', time: '1 day ago', title: 'Rispana River Conservation', location: 'Rispana, Dehradun', impact: '85 kg waste collected', co2Saved: '42 kg CO2', icon: Droplets, iconColor: 'text-sky-500', iconBg: 'bg-sky-500/10', verified: true, verifiedBy: 'AI + Community' },
        { date: 'Mar 6', time: '3 days ago', title: 'Rajpur Green Belt Plantation', location: 'Rajpur Road, Dehradun', impact: '25 saplings planted', co2Saved: '125 kg CO2/yr', icon: TreePine, iconColor: 'text-green-500', iconBg: 'bg-green-500/10', verified: true, verifiedBy: 'Blockchain' },
        { date: 'Mar 3', time: '6 days ago', title: 'Solar Initiative Workshop', location: 'UPES Campus', impact: '12 panels installed', co2Saved: '180 kg CO2/yr', icon: Zap, iconColor: 'text-amber-500', iconBg: 'bg-amber-500/10', verified: true, verifiedBy: 'Institution' },
    ];

    const verificationLayers = [
        { icon: Cpu, title: 'AI Verification', description: 'ML algorithms validate activities with 99.7% accuracy', status: 'Active', lastCheck: '2 min ago' },
        { icon: Shield, title: 'Blockchain Record', description: 'Immutable record ensures data integrity', status: 'Verified', lastCheck: 'Real-time' },
        { icon: Users, title: 'Community Validation', description: 'Peer endorsements from verified champions', status: 'Endorsed', lastCheck: '234 endorsements' },
        { icon: Building2, title: 'Institutional Recognition', description: 'Accepted by universities and employers', status: 'Certified', lastCheck: '500+ partners' }
    ];

    const topSdgs = [
        { number: 13, title: 'Climate Action', contribution: 99, color: '#3F7E44' },
        { number: 12, title: 'Responsible Consumption', contribution: 97, color: '#BF8B2E' },
        { number: 3, title: 'Good Health', contribution: 94, color: '#4C9F38' },
        { number: 15, title: 'Life on Land', contribution: 93, color: '#56C02B' },
    ];

    if (loading) {
        return <div className="min-h-screen bg-[#020617] flex items-center justify-center font-inter text-[#00ff9d] animate-pulse font-bold text-xl">Loading EVO Profile...</div>;
    }

    return (
        <div className="min-h-screen bg-[#020617] text-white font-inter pt-28 pb-12 px-4 sm:px-6 lg:px-8 overflow-x-hidden">
            <div className="max-w-7xl mx-auto">

                {/* 🎯 ACTION HEADER */}
                <div className="flex items-center justify-between mb-8">
                    <Link to="/CitizenHome" className="flex items-center gap-2 text-gray-400 hover:text-[#00ff9d] transition-colors">
                        <ArrowLeft size={20} />
                        <span className="font-medium">Back to Dashboard</span>
                    </Link>

                    <div className="flex gap-3">
                        <button
                            onClick={handleShare}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-bold hover:bg-white/10 transition-colors"
                        >
                            <Share2 size={16} /> <span className="hidden sm:inline">Share</span>
                        </button>

                        <button
                            onClick={handleExportPDF}
                            disabled={isExporting}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00ff9d] text-black text-sm font-bold hover:shadow-[0_0_15px_#00ff9d] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isExporting ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                            <span className="hidden sm:inline">{isExporting ? "Generating..." : "Export PDF"}</span>
                        </button>
                    </div>
                </div>

                {/* UI CONTENT */}
                <div className="bg-[#020617] p-2">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2">EVO Profile</h1>
                        <p className="text-gray-400">Your verified environmental impact record - trusted by institutions worldwide.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                        {/* LEFT COLUMN: ID Card */}
                        <div className="lg:col-span-4 space-y-6">

                            {/* ID Card */}
                            <div className={`p-6 bg-[#0a0f1b] border border-gray-800 rounded-3xl shadow-xl transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                                <div className="flex items-center justify-between mb-6">
                                    <span className="text-lg font-semibold text-white">EVO Profile</span>
                                    <span className="flex items-center gap-1 bg-[#00ff9d]/10 text-[#00ff9d] px-3 py-1 rounded-full text-xs font-bold border border-[#00ff9d]/30">
                                        <CheckCircle2 size={14} /> Verified
                                    </span>
                                </div>

                                <div className="flex items-start gap-4 mb-6">
                                    <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-[#00ff9d]/20 to-blue-500/20 flex items-center justify-center text-2xl font-bold text-[#00ff9d] border border-[#00ff9d]/30 uppercase">
                                        {profileData.username.substring(0, 2)}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-white mb-1">{profileData.username}</h3>
                                        <p className="text-xs text-gray-400 flex items-center gap-1 mb-2">
                                            <MapPin size={12} /> {profileData.zone}
                                        </p>
                                        <p className="text-[10px] text-gray-500">Member since March 2026</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-center mb-6 py-2">
                                    <div className="text-center">
                                        <ScoreRing score={9.2} />
                                        <p className="text-sm font-bold text-white mt-3">Sustainability Score</p>
                                        <p className="text-xs text-[#00ff9d]">Top 1% globally</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3 mb-6">
                                    <div className="p-4 bg-white/5 rounded-xl text-center border border-white/5">
                                        <div className="text-2xl font-bold text-white mb-1"><AnimatedCounter value={4892} /></div>
                                        <div className="text-[10px] text-gray-400 uppercase tracking-wider">kg CO2 Saved</div>
                                        <div className="text-xs text-[#00ff9d] mt-1">+324 this week</div>
                                    </div>
                                    <div className="p-4 bg-white/5 rounded-xl text-center border border-white/5">
                                        <div className="text-2xl font-bold text-white mb-1"><AnimatedCounter value={67} /></div>
                                        <div className="text-[10px] text-gray-400 uppercase tracking-wider">Actions Done</div>
                                        <div className="text-xs text-[#00ff9d] mt-1">5 this week</div>
                                    </div>
                                </div>

                                <div className="p-3 bg-black/40 rounded-xl border border-gray-800 flex justify-between items-center">
                                    <div>
                                        <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">Profile ID</div>
                                        <div className="font-mono text-xs text-white">EVR-2026-001337</div>
                                    </div>
                                    <span className="text-[10px] border border-[#00ff9d]/30 text-[#00ff9d] bg-[#00ff9d]/5 rounded-full px-2 py-1 font-bold">
                                        City Rank #12
                                    </span>
                                </div>
                            </div>

                            {/* Verification & Trust */}
                            <div className={`p-6 bg-[#0a0f1b] border border-gray-800 rounded-3xl shadow-xl transition-all duration-500 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h2 className="text-lg font-bold text-white mb-1">Verification & Trust</h2>
                                        <p className="text-xs text-gray-400">Multi-layer validation</p>
                                    </div>
                                    <span className="flex items-center gap-1 bg-[#00ff9d]/10 text-[#00ff9d] px-2 py-1 rounded-full text-[10px] font-bold border border-[#00ff9d]/30">
                                        All Active
                                    </span>
                                </div>

                                <div className="space-y-4">
                                    {verificationLayers.map((layer, index) => (
                                        <div key={index} className="flex items-start gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 border border-gray-800">
                                                <layer.icon size={14} className="text-[#00ff9d]" />
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-bold text-white">{layer.title}</h3>
                                                <p className="text-[10px] text-gray-500 mb-1">{layer.description}</p>
                                                <p className="text-[10px] text-[#00ff9d]">{layer.status}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>

                        {/* RIGHT COLUMN: Metrics, Timeline, Wallet */}
                        <div className="lg:col-span-8 space-y-6">

                            {/* Impact Metrics (Top Row) */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {metrics.map((metric, index) => (
                                    <div key={index} className={`p-5 bg-[#0a0f1b] rounded-3xl border border-gray-800 transition-all duration-500 hover:border-gray-600 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: `${index * 100}ms` }}>
                                        <div className={`w-10 h-10 rounded-xl ${metric.iconBg} flex items-center justify-center mb-4 border border-white/5`}>
                                            <metric.icon className={`h-5 w-5 ${metric.iconColor}`} />
                                        </div>
                                        <div className="mb-1">
                                            <span className="text-2xl font-black text-white"><AnimatedCounter value={metric.value} /></span>
                                            <span className="text-xs text-gray-500 ml-1">{metric.unit}</span>
                                        </div>
                                        <p className="text-sm font-bold text-gray-300 mb-1">{metric.label}</p>
                                        <p className="text-[10px] text-gray-500 mb-3">{metric.description}</p>
                                        <div className="flex items-center gap-1 bg-white/5 inline-block px-2 py-0.5 rounded text-[10px]">
                                            <span className="font-bold text-[#00ff9d]">{metric.change}</span>
                                            <span className="text-gray-400">{metric.changeLabel}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Middle Row: Activities & SDGs */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                {/* Recent Activities */}
                                <div className={`p-6 bg-[#0a0f1b] border border-gray-800 rounded-3xl shadow-xl transition-all duration-500 delay-200 ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-lg font-bold text-white">Verified Activities</h2>
                                        <span className="text-xs bg-white/5 px-2 py-1 rounded text-gray-400">67 total</span>
                                    </div>
                                    <div className="space-y-4">
                                        {activities.map((activity, index) => (
                                            <div key={index} className="flex gap-4 p-3 bg-white/5 rounded-xl">
                                                <div className={`w-10 h-10 rounded-xl ${activity.iconBg} flex items-center justify-center shrink-0`}>
                                                    <activity.icon className={`h-5 w-5 ${activity.iconColor}`} />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-sm font-bold text-white truncate flex items-center gap-2">
                                                        {activity.title} <CheckCircle2 size={12} className="text-[#00ff9d]" />
                                                    </h3>
                                                    <p className="text-[10px] text-gray-400 mt-1 flex items-center gap-1"><MapPin size={10} /> {activity.location}</p>
                                                    <div className="flex justify-between mt-2">
                                                        <span className="text-xs text-gray-300">{activity.impact}</span>
                                                        <span className="text-xs font-bold text-[#00ff9d]">{activity.co2Saved}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* SDGs */}
                                <div className={`p-6 bg-[#0a0f1b] border border-gray-800 rounded-3xl shadow-xl transition-all duration-500 delay-300 ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
                                    <h2 className="text-lg font-bold text-white mb-1">UN Goals Impact</h2>
                                    <p className="text-xs text-gray-400 mb-6">Your top contributions to global targets</p>

                                    <div className="space-y-3">
                                        {topSdgs.map((sdg) => (
                                            <div key={sdg.number} className="flex items-center gap-4 p-3 bg-white/5 rounded-xl border border-white/5">
                                                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-black" style={{ backgroundColor: sdg.color }}>
                                                    {sdg.number}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex justify-between mb-1">
                                                        <p className="text-sm font-bold text-white">{sdg.title}</p>
                                                        <p className="text-xs font-mono text-gray-400">{sdg.contribution}%</p>
                                                    </div>
                                                    <div className="w-full h-1.5 bg-black rounded-full overflow-hidden">
                                                        <div className="h-full rounded-full" style={{ width: `${sdg.contribution}%`, backgroundColor: sdg.color }}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Bottom Row: Green Wallet */}
                            <div className={`p-6 bg-[#0a0f1b] border border-gray-800 rounded-3xl shadow-xl transition-all duration-500 delay-400 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                                    {/* Balance */}
                                    <div>
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="p-3 rounded-xl bg-[#00ff9d]/10"><Leaf className="text-[#00ff9d]" size={20} /></div>
                                            <div>
                                                <h2 className="text-lg font-bold text-white">ECO Points</h2>
                                                <p className="text-xs text-gray-400">Sustainability wallet</p>
                                            </div>
                                        </div>
                                        <div className="p-5 rounded-2xl bg-gradient-to-br from-[#00ff9d]/10 to-transparent border border-[#00ff9d]/20 mb-4">
                                            <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Available Balance</p>
                                            <p className="text-4xl font-black text-white mb-2">{profileData.ecoCoins.toLocaleString()} <span className="text-sm text-gray-500 font-normal">pts</span></p>
                                            <p className="text-xs text-[#00ff9d] flex items-center gap-1"><TrendingUp size={12} /> +1,240 this month</p>
                                        </div>
                                    </div>

                                    {/* Recent Wallet Activity */}
                                    <div>
                                        <h3 className="text-sm font-bold text-gray-300 mb-4">Recent Transactions</h3>
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-1.5 bg-green-500/10 rounded-lg"><ArrowDownRight size={14} className="text-green-500" /></div>
                                                    <div>
                                                        <p className="text-sm font-bold text-white">River Cleanup</p>
                                                        <p className="text-[10px] text-gray-500">1 day ago</p>
                                                    </div>
                                                </div>
                                                <span className="text-green-500 font-bold text-sm">+250</span>
                                            </div>
                                            <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-1.5 bg-amber-500/10 rounded-lg"><ArrowUpRight size={14} className="text-amber-500" /></div>
                                                    <div>
                                                        <p className="text-sm font-bold text-white">Eco-Certificate</p>
                                                        <p className="text-[10px] text-gray-500">5 days ago</p>
                                                    </div>
                                                </div>
                                                <span className="text-amber-500 font-bold text-sm">-500</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Rewards */}
                                    <div>
                                        <h3 className="text-sm font-bold text-gray-300 mb-4">Redeem Points</h3>
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-gray-800">
                                                <div className="flex items-center gap-3">
                                                    <Award size={16} className="text-[#00ff9d]" />
                                                    <span className="text-sm font-bold text-white">Eco-Certificate</span>
                                                </div>
                                                <span className="text-xs bg-black px-2 py-1 rounded text-gray-400">1000 pts</span>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}