import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

// 🔥 Import Firebase Auth and Firestore
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function CitizenLogin() {
  const navigate = useNavigate();
  const auth = getAuth();

  // 🔥 Pre-filled test credentials for easy development
  const [email, setEmail] = useState("test@gmail.com");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleStudentLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 1. Authenticate with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Fetch the user's extra details (username, ecoCoins) from Firestore
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      let username = "Citizen";
      let ecoPoints = 0;

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        username = userData.username || "Citizen";
        ecoPoints = userData.ecoCoins || 0;
      }

      // 3. Save to localStorage so your Navbar and other components stay happy
      const userSession = {
        uid: user.uid,
        email: user.email,
        username: username,
        ecoPoints: ecoPoints,
      };
      localStorage.setItem("evora_loggedInUser", JSON.stringify(userSession));

      // 4. Navigate to Home
      navigate("/CitizenHome");

    } catch (err) {
      console.error("Login Error:", err);
      setError("❌ Incorrect email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0F1B] flex items-center justify-center px-4 font-inter">
      <div className="bg-[#0F1623] rounded-2xl shadow-[0_0_20px_#00ff9d20] border border-[#00ff9d30] p-10 w-full max-w-md">
        <h1 className="text-3xl text-center text-[#00ff9d] font-bold mb-2">
          Welcome to Evora
        </h1>

        <p className="text-center text-gray-400 mb-6">
          Citizen Login to continue your eco-journey
        </p>

        <form onSubmit={handleStudentLogin} className="space-y-4">
          <input
            type="email"
            required
            placeholder="Enter email"
            className="w-full p-3 rounded-xl bg-[#0c1320] border border-[#1f2a3a] text-gray-200 focus:outline-none focus:border-[#00ff9d]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            required
            placeholder="Enter password"
            className="w-full p-3 rounded-xl bg-[#0c1320] border border-[#1f2a3a] text-gray-200 focus:outline-none focus:border-[#00ff9d]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-4 bg-[#00ff9d] text-black font-bold rounded-xl hover:shadow-[0_0_20px_#00ff9d] transition active:scale-95 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Citizen Login"}
          </button>
        </form>

        <p className="text-center text-gray-400 text-sm mt-6">
          Don't have an account?{" "}
          <Link to="/CitizenSignup" className="text-[#00ff9d] hover:underline font-bold">
            Sign up here
          </Link>
        </p>

        <p className="text-center text-gray-500 text-xs mt-6">
          🌿 Learn. Play. Sustain.
        </p>
      </div>
    </div>
  );
}