import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

// 🔥 Import Firebase Auth and Firestore
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase"; // Adjust path if needed

export default function CitizenSignup() {
    const navigate = useNavigate();
    const auth = getAuth(); // Initialize Firebase Auth

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            return setError("❌ Passwords do not match");
        }

        setLoading(true);

        try {
            // 1. Create the user in Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // 2. Save their extra profile data in Firestore's 'users' collection
            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                username: username,
                email: email,
                role: "citizen",
                ecoCoins: 0,
                createdAt: new Date().toISOString()
            });

            // 3. Keep your existing localStorage logic so your Navbar still works!
            const userSession = {
                uid: user.uid,
                email: email,
                username: username,
                ecoPoints: 0,
            };
            localStorage.setItem("evora_loggedInUser", JSON.stringify(userSession));

            // 4. Send them to the dashboard
            navigate("/CitizenLogin");

        } catch (err) {
            console.error("Signup Error:", err);
            // Make Firebase errors look a bit friendlier
            if (err.code === "auth/email-already-in-use") setError("❌ Email is already registered");
            else if (err.code === "auth/weak-password") setError("❌ Password must be at least 6 characters");
            else setError("❌ Failed to create account");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0A0F1B] flex items-center justify-center px-4 font-inter">
            <div className="bg-[#0F1623] rounded-2xl shadow-[0_0_20px_#00ff9d20] border border-[#00ff9d30] p-10 w-full max-w-md">
                <h1 className="text-3xl text-center text-[#00ff9d] font-bold mb-2">Join Evora</h1>
                <p className="text-center text-gray-400 mb-6">Create your citizen account</p>

                <form onSubmit={handleSignup} className="space-y-4">
                    <input
                        type="text"
                        required
                        placeholder="Username (e.g., Akshat)"
                        className="w-full p-3 rounded-xl bg-[#0c1320] border border-[#1f2a3a] text-gray-200 focus:outline-none focus:border-[#00ff9d]"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="email"
                        required
                        placeholder="Email Address"
                        className="w-full p-3 rounded-xl bg-[#0c1320] border border-[#1f2a3a] text-gray-200 focus:outline-none focus:border-[#00ff9d]"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        required
                        placeholder="Password (min 6 characters)"
                        className="w-full p-3 rounded-xl bg-[#0c1320] border border-[#1f2a3a] text-gray-200 focus:outline-none focus:border-[#00ff9d]"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        required
                        placeholder="Confirm Password"
                        className="w-full p-3 rounded-xl bg-[#0c1320] border border-[#1f2a3a] text-gray-200 focus:outline-none focus:border-[#00ff9d]"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 mt-4 bg-[#00ff9d] text-black font-bold rounded-xl hover:shadow-[0_0_20px_#00ff9d] transition active:scale-95 disabled:opacity-50"
                    >
                        {loading ? "Creating Account..." : "Sign Up"}
                    </button>
                </form>

                <p className="text-center text-gray-400 text-sm mt-6">
                    Already have an account?{" "}
                    <Link to="/CitizenLogin" className="text-[#00ff9d] hover:underline font-bold">
                        Log in here
                    </Link>
                </p>
            </div>
        </div>
    );
}