import React, { useState } from "react";
import { Camera, MapPin, Sparkles, UploadCloud, FileText, Loader2, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

// 🔥 Import the clean AI Service
import { analyzeCivicIssue } from "../../../services/aiServices";

// 🔥 Import Firebase
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../firebase";

// 🔥 NEW: Image Compression Helper to bypass Firebase 1MB limit!
const compressImage = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                
                // Max dimensions (shrinks massive 4K phone photos down to a safe size)
                const MAX_WIDTH = 800;
                const MAX_HEIGHT = 800;
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                    }
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                
                // Compress as JPEG with 70% quality (drastically reduces Base64 string size)
                const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
                resolve(compressedBase64);
            };
            img.onerror = (err) => reject(err);
        };
        reader.onerror = (error) => reject(error);
    });
};

export default function Report() {
    const navigate = useNavigate();

    // 1. States
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [description, setDescription] = useState("");

    const [location, setLocation] = useState(null);
    const [locationStatus, setLocationStatus] = useState("Awaiting Image Upload...");
    const [isFetchingLocation, setIsFetchingLocation] = useState(false);

    const [aiStatus, setAiStatus] = useState("idle");
    const [aiResult, setAiResult] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // 2. Handlers
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
            setAiStatus("idle");
            setAiResult(null);
            
            // Automatically fetch location the moment an image is selected!
            fetchExactLocation();
        }
    };

    // Auto-fetch GPS Logic
    const fetchExactLocation = () => {
        setIsFetchingLocation(true);
        setLocationStatus("Acquiring GPS Signal...");
        
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
                    setLocationStatus("Live GPS Acquired");
                    setIsFetchingLocation(false);
                },
                (error) => {
                    console.error("GPS Error", error);
                    setLocationStatus("⚠️ GPS Failed. Please check browser permissions.");
                    setIsFetchingLocation(false);
                },
                { enableHighAccuracy: true, timeout: 10000 }
            );
        } else {
            setLocationStatus("Geolocation not supported by this device.");
            setIsFetchingLocation(false);
        }
    };

    // 3. Trigger the external AI Service
    const handleRunAI = async () => {
        if (!imageFile || !description) return alert("Please upload an image and write a description.");
        if (!location) return alert("Please wait for GPS location to be acquired first!");

        setAiStatus("analyzing");
        try {
            const result = await analyzeCivicIssue(imageFile, description, location);
            setAiResult(result);
            setAiStatus("complete");
        } catch (error) {
            alert(`Analysis failed: ${error.message}`);
            setAiStatus("idle");
        }
    };

    // 4. Submit the massive JSON + COMPRESSED Image to Firebase
    const handleSubmit = async () => {
        if (!location) return alert("Please get your GPS location first!");

        setIsSubmitting(true);
        try {
            const sessionData = JSON.parse(localStorage.getItem("evora_loggedInUser"));

            // 🔥 We now use compressImage instead of fileToBase64!
            let compressedBase64Image = null;
            if (imageFile) {
                compressedBase64Image = await compressImage(imageFile);
            }

            // Map the schema to our Map Categories
            let mapCategory = "Infrastructure";
            const dept = (aiResult.assigned_department || "").toLowerCase();
            const cat = (aiResult.predicted_category || "").toLowerCase();

            if (dept.includes("sanitation") || cat.includes("garbage") || cat.includes("waste")) {
                mapCategory = "Waste";
            } else if (dept.includes("water") || cat.includes("pipe") || cat.includes("leak") || cat.includes("sewage")) {
                mapCategory = "Water";
            } else if (dept.includes("forest") || cat.includes("tree")) {
                mapCategory = "Deforestation";
            } else if (dept.includes("pollution") || cat.includes("air") || cat.includes("smoke")) {
                mapCategory = "Air";
            }

            const newReport = {
                title: (aiResult.predicted_category || "Civic Issue").toUpperCase(),
                type: mapCategory,
                description: description || "No description provided",
                severity: (aiResult.severity_level || "medium").charAt(0).toUpperCase() + (aiResult.severity_level || "medium").slice(1),
                location: location,
                timestamp: new Date().toISOString(),
                citizenId: sessionData?.uid || "anonymous",
                citizenName: sessionData?.username || "Citizen",
                status: "Pending",
                aiData: aiResult,
                // 🔥 Save the compressed image
                imageBase64: compressedBase64Image
            };

            await addDoc(collection(db, "reports"), newReport);

            alert("✅ Detailed Smart Report submitted successfully!");
            navigate("/TrackReport"); 

        } catch (error) {
            console.error("Submission Error:", error);
            alert(`Failed to submit report: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    // 5. UI Render
    return (
        <div className="min-h-screen bg-[#020617] text-white font-inter flex flex-col">
            <main className="flex-1 flex flex-col items-center pt-32 pb-20 px-4 md:px-6">

                <div className="bg-[#0a0f1b] border border-gray-800 rounded-3xl p-6 md:p-10 w-full max-w-2xl shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-32 bg-[#00ff9d] opacity-5 blur-[80px] pointer-events-none"></div>

                    <div className="relative z-10 mb-8">
                        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                            Report Civic Issue / नागरिक समस्या रिपोर्ट करें
                        </h1>
                        <p className="text-gray-400 text-sm md:text-base">
                            Powered by EVORA Vision AI • Instant Issue Routing
                        </p>
                    </div>

                    <div className="space-y-6 relative z-10">

                        {/* --- Input Section --- */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-2">Photo Evidence <span className="text-red-500">*</span></label>
                            {!imagePreview ? (
                                <label className="border-2 border-dashed border-gray-700 hover:border-[#00ff9d] bg-[#0c1320] transition-colors rounded-2xl p-10 flex flex-col items-center justify-center text-center cursor-pointer group">
                                    <div className="w-14 h-14 bg-gray-800 group-hover:bg-[#00ff9d10] text-gray-400 group-hover:text-[#00ff9d] transition-colors rounded-full flex items-center justify-center mb-4"><Camera size={28} /></div>
                                    <p className="text-[#00ff9d] font-semibold mb-1">Click to upload or use camera</p>
                                    <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                                </label>
                            ) : (
                                <div className="relative rounded-2xl overflow-hidden border border-gray-700 h-48 w-full group">
                                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <label className="px-4 py-2 bg-white text-black font-bold rounded-lg cursor-pointer">Change Image<input type="file" accept="image/*" className="hidden" onChange={handleImageChange} /></label>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Auto-Location Status Bar */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-2">Issue Location <span className="text-red-500">*</span></label>
                            <div className={`w-full py-3.5 px-4 rounded-xl border flex items-center justify-between transition-all ${
                                location 
                                ? 'bg-[#00ff9d]/10 border-[#00ff9d]/30' 
                                : 'border-gray-800 bg-[#0c1320]'
                            }`}>
                                <div className="flex items-center gap-3">
                                    {isFetchingLocation ? (
                                        <Loader2 size={18} className="animate-spin text-blue-400" />
                                    ) : location ? (
                                        <CheckCircle2 size={18} className="text-[#00ff9d]" />
                                    ) : (
                                        <MapPin size={18} className="text-gray-500" />
                                    )}
                                    <span className={`font-medium text-sm ${location ? 'text-[#00ff9d]' : 'text-gray-400'}`}>
                                        {locationStatus}
                                    </span>
                                </div>
                                {location && !isFetchingLocation && (
                                    <span className="text-xs font-mono text-[#00ff9d] opacity-70">
                                        {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-2">Context / Description <span className="text-red-500">*</span></label>
                            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="E.g., Huge pothole near the crossing..." className="w-full p-4 rounded-xl border border-gray-700 bg-[#0c1320] text-white focus:outline-none focus:border-[#00ff9d] transition-all min-h-[100px] resize-y"></textarea>
                        </div>

                        {/* --- AI Action & Results Section --- */}
                        {aiStatus !== "complete" && (
                            <div className="pt-2">
                                <button onClick={handleRunAI} disabled={aiStatus === "analyzing" || !imageFile || !description || !location} className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg active:scale-[0.99] ${!imageFile || !description || !location ? "bg-gray-800 text-gray-500 cursor-not-allowed" : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)]"}`}>
                                    <Sparkles size={20} className={aiStatus === "analyzing" ? "animate-spin" : ""} />
                                    {aiStatus === "idle" ? "Analyze with AI Inspector" : "Generating Work Order..."}
                                </button>
                            </div>
                        )}

                        {aiStatus === "complete" && aiResult && (
                            <div className="bg-[#eff4ff] rounded-xl p-6 border border-blue-200 mt-4 animate-in fade-in slide-in-from-bottom-4 duration-500 text-black">
                                <div className="flex items-start gap-2 mb-4 border-b border-blue-200 pb-4">
                                    <Sparkles size={24} className="text-blue-600 mt-0.5" />
                                    <div>
                                        <h3 className="text-xl font-bold text-[#1e3a8a] mb-1">AI Analysis Results</h3>
                                        <p className="text-blue-700 text-sm">{aiResult.description}</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-y-4 gap-x-4 text-sm mb-6">
                                    <div><span className="text-gray-500 block text-xs uppercase tracking-wide">Category</span><span className="text-blue-600 font-bold uppercase">{aiResult.predicted_category}</span></div>
                                    <div><span className="text-gray-500 block text-xs uppercase tracking-wide">Confidence</span><span className="text-blue-600 font-bold">{Math.round(aiResult.category_confidence * 100)}%</span></div>
                                    <div><span className="text-gray-500 block text-xs uppercase tracking-wide">Severity</span><span className="text-orange-600 font-bold uppercase">{aiResult.severity_level} ({aiResult.final_severity})</span></div>
                                    <div><span className="text-gray-500 block text-xs uppercase tracking-wide">Routing</span><span className="text-blue-600 font-bold">{aiResult.assigned_department}</span></div>
                                </div>
                                <div className="mb-6">
                                    <span className="font-bold text-sm block mb-2">Health & Safety Risks:</span>
                                    <div className="flex flex-wrap gap-2">
                                        {aiResult.health_risks.map((risk, idx) => (<span key={idx} className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-medium border border-red-200">{risk}</span>))}
                                    </div>
                                </div>
                                <div className="bg-white rounded-lg p-4 border border-blue-100">
                                    <div className="flex justify-between items-center mb-2"><span className="font-bold text-sm flex items-center gap-1"><FileText size={16} className="text-blue-600" /> Automated Work Order</span></div>
                                    <ul className="text-xs text-gray-600 space-y-1 mb-3">
                                        <li>• Team Required: {aiResult.work_order.estimated_workers} workers</li>
                                        <li>• Estimated Time: {aiResult.work_order.estimated_duration_hours} hours</li>
                                    </ul>
                                </div>
                            </div>
                        )}

                        {/* --- Submit Section --- */}
                        <div className="pt-4 border-t border-gray-800">
                            <button onClick={handleSubmit} disabled={aiStatus !== "complete" || isSubmitting || !location} className={`w-full py-4 rounded-xl font-extrabold flex items-center justify-center gap-2 transition-all active:scale-[0.99] ${aiStatus === "complete" && location ? "bg-[#00ff9d] text-black hover:shadow-[0_0_20px_#00ff9d]" : "bg-gray-800 text-gray-500 cursor-not-allowed"}`}>
                                {isSubmitting ? <Sparkles className="animate-spin" size={20} /> : <UploadCloud size={20} />}
                                {isSubmitting ? "Uploading to Digital Twin..." : "Submit Verified Report"}
                            </button>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}