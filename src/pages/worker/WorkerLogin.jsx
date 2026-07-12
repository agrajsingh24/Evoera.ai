import React, { useState } from "react";
import { Mail, Lock, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

// 🔥 Firebase Imports
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function WorkerLogin() {
    const navigate = useNavigate();
    const auth = getAuth();

    const [email, setEmail] = useState("worker@gmail.com");
    const [password, setPassword] = useState("123456");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError("⚠️ Please enter both email and password");
            return;
        }

        setLoading(true);
        setError("");

        try {
            // 1. Authenticate with Firebase
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // 2. Fetch the worker's data from Firestore to get their Name & Vehicle Number
            const workerDocRef = doc(db, "workers", user.uid);
            const workerDocSnap = await getDoc(workerDocRef);

            if (!workerDocSnap.exists()) {
                setError("❌ Worker profile not found. Are you a citizen?");
                setLoading(false);
                return;
            }

            const workerData = workerDocSnap.data();

            setSuccess("✅ Login successful! Redirecting...");

            // 3. Store session data including the UID and Vehicle Number
            const userSession = {
                uid: user.uid,
                email: user.email,
                username: workerData.driver,
                vehicleId: workerData.id, // e.g. "UK-07-AR-1234"
                role: "worker",
                ecoPoints: 0,
            };
            localStorage.setItem("evora_loggedInUser", JSON.stringify(userSession));

            // 4. Redirect to Worker Dashboard
            setTimeout(() => {
                navigate("/WorkerDashboard");
            }, 1000);

        } catch (err) {
            console.error("Worker Login Error:", err);
            setError("❌ Invalid email or password");
            setSuccess("");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 font-inter">
            <div className="bg-[#0a0f1b] border border-[#00ff9d40] rounded-3xl shadow-[0_0_30px_rgba(0,255,153,0.15)] p-8 w-full max-w-md relative overflow-hidden">

                {/* Subtle background glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-32 bg-[#00ff9d] opacity-10 blur-[80px] pointer-events-none"></div>

                <div className="relative z-10">
                    <h1 className="text-3xl font-bold text-white text-center mb-2">
                        Worker Login
                    </h1>
                    <p className="text-gray-400 text-sm text-center mb-8">Welcome back to CivicFlow</p>

                    <form className="space-y-4" onSubmit={handleLogin}>

                        {/* Email */}
                        <div className="flex items-center gap-3 bg-[#050505] px-4 py-3.5 rounded-xl border border-gray-800 focus-within:border-[#00ff9d50] transition-colors">
                            <Mail size={20} className="text-[#00ff9d]" />
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="bg-transparent w-full outline-none text-white placeholder-gray-500"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        {/* Password */}
                        <div className="flex items-center gap-3 bg-[#050505] px-4 py-3.5 rounded-xl border border-gray-800 focus-within:border-[#00ff9d50] transition-colors">
                            <Lock size={20} className="text-[#00ff9d]" />
                            <input
                                type="password"
                                placeholder="Password"
                                className="bg-transparent w-full outline-none text-white placeholder-gray-500"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        {/* Error / Success Messages */}
                        {error && <p className="text-red-400 text-sm text-center bg-red-400/10 py-2 rounded-lg">{error}</p>}
                        {success && <p className="text-[#00ff9d] text-sm text-center bg-[#00ff9d10] py-2 rounded-lg">{success}</p>}

                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 mt-2 bg-[#00ff9d] text-black font-extrabold rounded-xl hover:shadow-[0_0_20px_rgba(0,255,153,0.4)] transition-all active:scale-[0.98] disabled:opacity-50 flex justify-center items-center gap-2"
                        >
                            {loading && <Loader2 size={18} className="animate-spin" />}
                            {loading ? "Authenticating..." : "Sign In"}
                        </button>
                    </form>

                    {/* Registration Link */}
                    <div className="mt-8 text-center border-t border-gray-800 pt-6">
                        <p className="text-gray-400 text-sm">
                            Don't have an account?{" "}
                            <span
                                onClick={() => navigate("/WorkerSignup")}
                                className="text-[#00ff9d] cursor-pointer hover:underline font-semibold"
                            >
                                Sign Up here
                            </span>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}