import { useState } from "react";
import { loginUser } from "../../utils/storage";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modal, setModal] = useState({ show: false, message: "", success: false });
  const navigate = useNavigate();

  const handleLogin = () => {
    const result = loginUser(email, password);
    if (result.success) {
      setModal({ show: true, message: `Welcome back, ${result.user.username}!`, success: true });
      setTimeout(() => {
        setModal({ show: false, message: "", success: false });
        navigate("/");
      }, 2000);
    } else {
      setModal({ show: true, message: result.message, success: false });
      setTimeout(() => setModal({ show: false, message: "", success: false }), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
      {/* Login Card */}
      <div className="bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-lg p-8 w-full max-w-md text-center border border-green-500/20">
        <h2 className="text-2xl font-bold text-green-400 mb-2">Welcome to Evora 🌿</h2>
        <p className="text-gray-400 mb-6">Login to continue your eco-journey</p>

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-800 border border-green-500/30 focus:border-green-400 focus:ring-2 focus:ring-green-400/40 outline-none mb-4"
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-800 border border-green-500/30 focus:border-green-400 focus:ring-2 focus:ring-green-400/40 outline-none mb-6"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-green-500 hover:bg-green-400 text-black font-semibold py-3 rounded-lg transition-all"
        >
          Login
        </button>

        <p className="text-gray-500 text-sm mt-6">🌱 Learn. Play. Sustain.</p>
      </div>

      {/* Modal */}
      {modal.show && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
          <div
            className={`${modal.success ? "bg-green-500 text-black" : "bg-red-500 text-white"
              } rounded-xl shadow-xl px-8 py-6 text-center animate-fadeIn`}
          >
            <p className="text-lg font-semibold">{modal.message}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
