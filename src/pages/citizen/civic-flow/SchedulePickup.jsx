import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Truck, Leaf, Recycle, Zap, Info, Loader2, MapPin, CheckCircle2 } from "lucide-react";

// 🔥 Firebase Imports
import { collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../../firebase";

export default function SchedulePickup() {
    const navigate = useNavigate();
    const auth = getAuth();
    const today = new Date().toISOString().split('T')[0];

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isFetchingLocation, setIsFetchingLocation] = useState(false);

    const [formData, setFormData] = useState({
        wasteType: "organic",
        date: "",
        timeSlot: "Morning (7:00 AM - 11:00 AM)",
        address: "",
        coords: null
    });

    const wasteTypes = [
        { id: "organic", label: "Organic / Wet", icon: <Leaf size={20} />, color: "text-green-400" },
        { id: "recyclable", label: "Recyclable / Dry", icon: <Recycle size={20} />, color: "text-blue-400" },
        { id: "e-waste", label: "Electronic / Haz", icon: <Zap size={20} />, color: "text-yellow-400" },
    ];

    // 🔥 Auto-fetch GPS on component mount
    useEffect(() => {
        handleGetLocation();
    }, []);

    // 🔥 Auto-fetch GPS and Reverse Geocode
    const handleGetLocation = () => {
        setIsFetchingLocation(true);
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    try {
                        const { latitude, longitude } = position.coords;

                        // Use OpenStreetMap's free API to convert lat/lng to a street address
                        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
                        const data = await response.json();

                        if (data && data.display_name) {
                            setFormData(prev => ({
                                ...prev,
                                address: data.display_name,
                                coords: { lat: latitude, lng: longitude }
                            }));
                        } else {
                            setFormData(prev => ({
                                ...prev,
                                address: `Coordinates: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
                                coords: { lat: latitude, lng: longitude }
                            }));
                        }
                    } catch (error) {
                        console.error("Geocoding Error:", error);
                        setFormData(prev => ({
                            ...prev,
                            address: `Coordinates: ${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`,
                            coords: { lat: position.coords.latitude, lng: position.coords.longitude }
                        }));
                    } finally {
                        setIsFetchingLocation(false);
                    }
                },
                (error) => {
                    console.error("GPS Error:", error);
                    alert("⚠️ GPS Failed. Please check your browser permissions to schedule a pickup.");
                    setIsFetchingLocation(false);
                },
                { enableHighAccuracy: true, timeout: 10000 }
            );
        } else {
            alert("Geolocation is not supported by your browser.");
            setIsFetchingLocation(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.coords) {
            alert("Please allow location access to schedule a pickup.");
            return;
        }

        setIsSubmitting(true);

        try {
            const user = auth.currentUser;
            const userData = JSON.parse(localStorage.getItem("evora_loggedInUser"));
            const citizenId = user ? user.uid : (userData?.uid || "anonymous_user");

            const pickupData = {
                citizenId: citizenId,
                citizenName: userData?.username || "Eco Citizen",
                type: "Scheduled",
                wasteType: formData.wasteType,
                date: formData.date,
                timeSlot: formData.timeSlot,
                address: formData.address,
                location: formData.coords,
                status: "Scheduled",
                timestamp: new Date().toISOString()
            };

            await addDoc(collection(db, "pickups"), pickupData);

            alert("✅ Pickup Scheduled Successfully!");
            navigate("/CitizenDashboard");

        } catch (error) {
            console.error("Error scheduling pickup: ", error);
            alert("❌ Failed to schedule pickup. Please try again.");
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
                    className="flex items-center gap-2 text-gray-400 hover:text-[#00ff9d] transition-colors mb-8 group"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Dashboard
                </button>

                <div className="mb-10">
                    <h1 className="text-3xl font-bold mb-2">Schedule Garbage Pickup</h1>
                    <p className="text-gray-400 text-sm">Select your waste category and preferred time for collection.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">

                    {/* Waste Type Selection */}
                    <section>
                        <label className="block text-sm font-semibold text-gray-300 mb-4 uppercase tracking-wider">
                            1. Select Waste Category
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {wasteTypes.map((type) => (
                                <div
                                    key={type.id}
                                    onClick={() => setFormData({ ...formData, wasteType: type.id })}
                                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col items-center gap-3 ${formData.wasteType === type.id
                                        ? "border-[#00ff9d] bg-[#00ff9d]/10 shadow-[0_0_20px_rgba(0,255,153,0.1)] scale-[1.02]"
                                        : "border-gray-800 bg-[#0a0f1b] hover:border-gray-700"
                                        }`}
                                >
                                    <div className={type.color}>{type.icon}</div>
                                    <span className="text-sm font-bold">{type.label}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Date and Time Slot */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <section>
                            <label className="block text-sm font-semibold text-gray-300 mb-4 uppercase tracking-wider flex items-center gap-2">
                                <Calendar size={16} /> 2. Pickup Date
                            </label>
                            <input
                                type="date"
                                required
                                min={today}
                                value={formData.date}
                                style={{ colorScheme: "dark" }}
                                className="w-full bg-[#0a0f1b] border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00ff9d] transition-colors"
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            />
                        </section>

                        <section>
                            <label className="block text-sm font-semibold text-gray-300 mb-4 uppercase tracking-wider flex items-center gap-2">
                                <Clock size={16} /> 3. Preferred Slot
                            </label>
                            <select
                                className="w-full bg-[#0a0f1b] border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00ff9d] transition-colors appearance-none"
                                onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                            >
                                <option value="Morning (7:00 AM - 11:00 AM)">Morning (7:00 AM - 11:00 AM)</option>
                                <option value="Afternoon (12:00 PM - 4:00 PM)">Afternoon (12:00 PM - 4:00 PM)</option>
                                <option value="Evening (4:00 PM - 7:00 PM)">Evening (4:00 PM - 7:00 PM)</option>
                            </select>
                        </section>
                    </div>

                    {/* 🔥 READ-ONLY Location Card */}
                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <label className="block text-sm font-semibold text-gray-300 uppercase tracking-wider">
                                4. Pickup Location
                            </label>
                            <button
                                type="button"
                                onClick={handleGetLocation}
                                disabled={isFetchingLocation}
                                className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white transition-colors disabled:opacity-50"
                            >
                                {isFetchingLocation ? <Loader2 size={14} className="animate-spin" /> : <MapPin size={14} />}
                                Refresh
                            </button>
                        </div>

                        <div className={`p-4 rounded-xl border ${formData.coords ? 'bg-[#00ff9d]/5 border-[#00ff9d]/30' : 'bg-[#0a0f1b] border-gray-800'} flex items-start gap-4`}>
                            <div className={`p-3 rounded-full mt-1 ${formData.coords ? 'bg-[#00ff9d]/20 text-[#00ff9d]' : 'bg-gray-800 text-gray-500'}`}>
                                {isFetchingLocation ? <Loader2 size={24} className="animate-spin" /> : <MapPin size={24} />}
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-white mb-1">
                                    {isFetchingLocation ? "Locating..." : formData.coords ? "Location Confirmed" : "Location Required"}
                                </h3>
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    {isFetchingLocation ? "Acquiring GPS signal..." : formData.address || "Please allow location access to continue."}
                                </p>
                                {formData.coords && !isFetchingLocation && (
                                    <div className="flex items-center gap-2 mt-2 text-xs text-[#00ff9d] font-mono">
                                        <CheckCircle2 size={12} /> {formData.coords.lat.toFixed(5)}, {formData.coords.lng.toFixed(5)}
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* Info Card */}
                    <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl flex gap-3 items-start">
                        <Info className="text-blue-400 shrink-0 mt-0.5" size={18} />
                        <p className="text-xs text-blue-200 leading-relaxed">
                            Please ensure waste is segregated according to the selected category. Pickups for E-waste or Hazardous materials may take 24-48 hours longer for specialized handling.
                        </p>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting || !formData.coords}
                        className="w-full bg-[#00ff9d] text-black py-4 rounded-xl font-bold text-lg hover:shadow-[0_0_25px_rgba(0,255,153,0.3)] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? <Loader2 size={22} className="animate-spin" /> : <Truck size={22} />}
                        {isSubmitting ? "Scheduling..." : "Confirm Schedule"}
                    </button>

                </form>
            </div>
        </div>
    );
}