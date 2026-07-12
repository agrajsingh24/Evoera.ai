import React, { useState } from "react";
import { Mail, Lock, User, Phone, Truck, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

// 🔥 Firebase Imports
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function WorkerSignUp() {
  const navigate = useNavigate();
  const auth = getAuth();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!fullName || !email || !password || !phone || !vehicle) {
      setError("⚠️ Please fill all required fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // 1. Create secure account in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Save worker profile to Firestore 'workers' collection
      await setDoc(doc(db, "workers", user.uid), {
        uid: user.uid,
        id: vehicle, // We use the vehicle number as the primary ID for the Admin Map!
        driver: fullName,
        email: email,
        phone: phone,
        aadhar: aadhar || "",
        role: "worker",
        status: "Offline",
        location: { lat: 0, lng: 0 },
        battery: "100%", // Default starting value
        load: "0%",      // Default starting value
        createdAt: new Date().toISOString()
      });

      setSuccess("✅ Worker registered successfully!");

      // Redirect to Worker Login
      setTimeout(() => {
        navigate("/WorkerLogin");
      }, 1500);

    } catch (err) {
      console.error("Worker Signup Error:", err);
      if (err.code === "auth/email-already-in-use") {
        setError("⚠️ Worker with this email already exists");
      } else if (err.code === "auth/weak-password") {
        setError("⚠️ Password must be at least 6 characters");
      } else {
        setError("❌ Failed to register worker. Please try again.");
      }
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
            Worker Sign-Up
          </h1>
          <p className="text-gray-400 text-sm text-center mb-8">Join the CivicFlow workforce</p>

          <form className="space-y-4" onSubmit={handleSignUp}>
            {/* Full Name */}
            <div className="flex items-center gap-3 bg-[#050505] px-4 py-3.5 rounded-xl border border-gray-800 focus-within:border-[#00ff9d50] transition-colors">
              <User size={20} className="text-[#00ff9d]" />
              <input
                type="text"
                placeholder="Full Name"
                className="bg-transparent w-full outline-none text-white placeholder-gray-500"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            {/* Email */}
            <div className="flex items-center gap-3 bg-[#050505] px-4 py-3.5 rounded-xl border border-gray-800 focus-within:border-[#00ff9d50] transition-colors">
              <Mail size={20} className="text-[#00ff9d]" />
              <input
                type="email"
                placeholder="Email"
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
                placeholder="Password (min 6 chars)"
                className="bg-transparent w-full outline-none text-white placeholder-gray-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Phone */}
            <div className="flex items-center gap-3 bg-[#050505] px-4 py-3.5 rounded-xl border border-gray-800 focus-within:border-[#00ff9d50] transition-colors">
              <Phone size={20} className="text-[#00ff9d]" />
              <input
                type="tel"
                placeholder="Phone Number"
                className="bg-transparent w-full outline-none text-white placeholder-gray-500"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            {/* Vehicle Number */}
            <div className="flex items-center gap-3 bg-[#050505] px-4 py-3.5 rounded-xl border border-gray-800 focus-within:border-[#00ff9d50] transition-colors">
              <Truck size={20} className="text-[#00ff9d]" />
              <input
                type="text"
                placeholder="Vehicle Number (e.g. UK-07-AB-1234)"
                className="bg-transparent w-full outline-none text-white placeholder-gray-500 uppercase"
                value={vehicle}
                onChange={(e) => setVehicle(e.target.value)}
                required
              />
            </div>

            {/* Error / Success Messages */}
            {error && <p className="text-red-400 text-sm text-center bg-red-400/10 py-2 rounded-lg">{error}</p>}
            {success && <p className="text-[#00ff9d] text-sm text-center bg-[#00ff9d10] py-2 rounded-lg">{success}</p>}

            {/* Sign-Up Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 mt-2 bg-[#00ff9d] text-black font-extrabold rounded-xl hover:shadow-[0_0_20px_rgba(0,255,153,0.4)] transition-all active:scale-[0.98] disabled:opacity-50 flex justify-center items-center gap-2"
            >
              {loading && <Loader2 size={18} className="animate-spin" />}
              {loading ? "Registering..." : "Sign Up Worker"}
            </button>
          </form>

          {/* Login Redirect Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Already registered?{" "}
              <span
                onClick={() => navigate("/WorkerLogin")}
                className="text-[#00ff9d] cursor-pointer hover:underline font-semibold"
              >
                Login here
              </span>
            </p>
          </div>

          <p className="mt-8 text-xs text-gray-500 text-center leading-relaxed">
            Workers registered here will be tracked by Admin and can grab tasks, update locations, and mark tasks as completed.
          </p>
        </div>
      </div>
    </div>
  );
}