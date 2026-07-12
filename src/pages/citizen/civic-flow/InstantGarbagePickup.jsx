import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Truck, Leaf, Recycle, Zap, MapPin, AlertCircle, Loader2 } from "lucide-react";

// 🔥 Firebase Imports
import { collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../../firebase";

export default function InstantGarbagePickup() {
    const navigate = useNavigate();
    const auth = getAuth();

    // Form State
    const [wasteType, setWasteType] = useState("organic");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Auto-Fetched State
    const [autoData, setAutoData] = useState({
        date: "",
        timeSlot: "",
        locationStatus: "Fetching location...",
        coords: null,
    });

    const wasteTypes = [
        { id: "organic", label: "Organic / Wet", icon: <Leaf size={20} />, color: "text-green-400" },
        { id: "recyclable", label: "Recyclable / Dry", icon: <Recycle size={20} />, color: "text-blue-400" },
        { id: "e-waste", label: "Electronic / Haz", icon: <Zap size={20} />, color: "text-yellow-400" },
    ];

    // On Component Mount: Auto-fetch Date, Time, and GPS Location
    useEffect(() => {
        // 1. Get Current Date
        const today = new Date();
        const formattedDate = today.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

        // 2. Determine Current Time Slot
        const hour = today.getHours();
        let currentSlot = "Evening (4:00 PM - 7:00 PM)";
        if (hour < 12) currentSlot = "Morning (7:00 AM - 11:00 AM)";
        else if (hour < 16) currentSlot = "Afternoon (12:00 PM - 4:00 PM)";
        else if (hour > 19) currentSlot = "Night Dispatch (ASAP)"; // If they order late

        setAutoData(prev => ({ ...prev, date: formattedDate, timeSlot: currentSlot }));

        // 3. Get Live GPS Location
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setAutoData(prev => ({
                        ...prev,
                        coords: { lat: position.coords.latitude, lng: position.coords.longitude },
                        locationStatus: "Live GPS Acquired ✅"
                    }));
                },
                (error) => {
                    console.error("GPS Error:", error);
                    setAutoData(prev => ({ ...prev, locationStatus: "⚠️ GPS Failed. Please enable location." }));
                },
                { enableHighAccuracy: true, timeout: 10000 }
            );
        } else {
            setAutoData(prev => ({ ...prev, locationStatus: "Geolocation not supported." }));
        }
    }, []);

    // Handle Submission to Firebase
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!autoData.coords) {
            alert("Please wait for GPS location to be acquired before requesting a pickup.");
            return;
        }

        setIsSubmitting(true);

        try {
            // Get user info
            const user = auth.currentUser;
            const userData = JSON.parse(localStorage.getItem("evora_loggedInUser"));
            const citizenId = user ? user.uid : (userData?.uid || "anonymous_user");

            // Build the pickup document
            const pickupRequest = {
                citizenId: citizenId,
                citizenName: userData?.username || "Eco Citizen",
                type: "Instant",
                wasteType: wasteType,
                date: autoData.date,
                timeSlot: autoData.timeSlot,
                location: autoData.coords, // Sends Lat/Lng directly to your Admin Map!
                status: "Pending", // Will change to 'Assigned' when a worker accepts it
                timestamp: new Date().toISOString()
            };

            // 🔥 Save to Firebase 'pickups' collection
            await addDoc(collection(db, "pickups"), pickupRequest);

            alert("🚨 Instant Pickup Requested! Connecting to nearest fleet...");
            navigate("/CitizenDashboard"); // Redirect back to dashboard

        } catch (error) {
            console.error("Error scheduling pickup: ", error);
            alert("Failed to request pickup. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#020617] text-white font-inter pb-12">
            <div className="max-w-3xl mx-auto px-6 pt-10">

                {/* Back Button */}
                <button
                    onClick={() => navigate('/CitizenDashboard')}
                    className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors mb-8 group"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    Cancel Instant Request
                </button>

                <div className="mb-10 flex items-center gap-4 border-b border-gray-800 pb-6">
                    <div className="w-14 h-14 bg-red-500/10 rounded-full border border-red-500/30 flex items-center justify-center animate-pulse">
                        <Zap size={28} className="text-red-500" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold mb-1 text-white">Instant Garbage Pickup</h1>
                        <p className="text-gray-400 text-sm">Fast-track dispatch to your live GPS location.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">

                    {/* 1. Waste Type Selection (The only manual input) */}
                    <section>
                        <label className="block text-sm font-semibold text-gray-300 mb-4 uppercase tracking-wider">
                            1. Select Waste Category
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {wasteTypes.map((type) => (
                                <div
                                    key={type.id}
                                    onClick={() => setWasteType(type.id)}
                                    className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col items-center gap-3 ${wasteType === type.id
                                        ? "border-red-500 bg-red-500/10 shadow-[0_0_20px_rgba(239,68,68,0.2)] scale-[1.02]"
                                        : "border-gray-800 bg-[#0a0f1b] hover:border-gray-700"
                                        }`}
                                >
                                    <div className={type.color}>{type.icon}</div>
                                    <span className="text-sm font-bold">{type.label}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* 2. Auto-Detected Info (Read Only) */}
                    <section className="bg-[#0a0f1b] border border-gray-800 rounded-2xl p-6 shadow-lg">
                        <label className="block text-sm font-semibold text-gray-300 mb-6 uppercase tracking-wider flex items-center gap-2">
                            <MapPin size={16} className="text-[#00ff9d]" /> 2. Auto-Detected Dispatch Details
                        </label>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Date Card */}
                            <div className="bg-[#020617] p-4 rounded-xl border border-gray-800">
                                <p className="text-xs text-gray-500 flex items-center gap-2 mb-1"><Calendar size={14} /> Current Date</p>
                                <p className="font-bold text-white">{autoData.date || "Loading..."}</p>
                            </div>

                            {/* Time Card */}
                            <div className="bg-[#020617] p-4 rounded-xl border border-gray-800">
                                <p className="text-xs text-gray-500 flex items-center gap-2 mb-1"><Clock size={14} /> Dispatch Window</p>
                                <p className="font-bold text-white">{autoData.timeSlot || "Loading..."}</p>
                            </div>

                            {/* GPS Location Card (Spans full width) */}
                            <div className="bg-[#020617] p-4 rounded-xl border border-gray-800 md:col-span-2 flex justify-between items-center">
                                <div>
                                    <p className="text-xs text-gray-500 flex items-center gap-2 mb-1"><MapPin size={14} /> Live Coordinates</p>
                                    <p className={`font-bold text-sm ${autoData.coords ? "text-[#00ff9d]" : "text-yellow-500 animate-pulse"}`}>
                                        {autoData.locationStatus}
                                    </p>
                                </div>
                                {autoData.coords && (
                                    <div className="text-right text-xs font-mono text-gray-500 bg-white/5 p-2 rounded">
                                        Lat: {autoData.coords.lat.toFixed(4)}<br />
                                        Lng: {autoData.coords.lng.toFixed(4)}
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* Warning Note */}
                    <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-xl flex gap-3 items-start">
                        <AlertCircle className="text-yellow-500 shrink-0 mt-0.5" size={18} />
                        <p className="text-xs text-yellow-200 leading-relaxed">
                            <strong>Note:</strong> Instant pickups dispatch the nearest available fleet vehicle to your exact GPS coordinates. Please ensure you are physically at the pickup location when submitting this request.
                        </p>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting || !autoData.coords}
                        className="w-full bg-red-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-red-600 hover:shadow-[0_0_25px_rgba(239,68,68,0.4)] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? <Loader2 size={22} className="animate-spin" /> : <Truck size={22} />}
                        {isSubmitting ? "Connecting to Fleet..." : "Dispatch Truck Now"}
                    </button>

                </form>
            </div>
        </div>
    );
}