import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  PlusCircle,
  MapPin,
  Award,
  ArrowLeft,
  Activity,
  Truck,
  User,
  LogOut,
  Menu,
  X
} from "lucide-react";

// 🔥 Import Firebase Auth for secure logout
import { getAuth, signOut } from "firebase/auth";

export default function CivicFlowNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = getAuth();

  const [citizenInfo, setCitizenInfo] = useState({ fullName: "Eco Citizen" });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Fetch user data from localStorage to display their name
  useEffect(() => {
    try {
      const storedData = localStorage.getItem("evora_loggedInUser");
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        if (parsedData && parsedData.username) {
          setCitizenInfo({ fullName: parsedData.username });
        }
      }
    } catch (error) {
      console.error("Failed to parse citizen data:", error);
    }
  }, []);

  // Handle Secure Logout
  const handleLogout = async () => {
    try {
      await signOut(auth); // Securely end the Firebase session
      localStorage.removeItem("evora_loggedInUser");
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const navLinks = [
    { name: "Dashboard", path: "/CitizenDashboard", icon: <LayoutDashboard size={18} /> },
    { name: "Report Issue", path: "/Report", icon: <PlusCircle size={18} /> },
    { name: "Garbage Pickup", path: "/SchedulePickup", icon: <Truck size={18} /> },
    { name: "Track Status", path: "/TrackReport", icon: <MapPin size={18} /> },
    { name: "Rewards", path: "/Reward", icon: <Award size={18} /> },
  ];

  return (
    <nav className="bg-[#020617] border-b border-neon-green/30 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Left Side: Brand Logo & Home Link */}
          <Link
            to="/CitizenHome"
            className="flex items-center gap-4 group hover:opacity-90 transition-opacity"
            title="Back to Home"
          >
            <div className="flex items-center gap-2">
              <Activity size={24} className="text-neon-green shadow-[0_0_10px_rgba(0,255,153,0.2)]" />
              <span className="font-bold text-xl text-white tracking-wide">
                CivicFlow <span className="text-neon-green text-sm font-normal">Portal</span>
              </span>
            </div>

            {/* Vertical Divider - Now acting as a separator from the navigation */}
            <div className="h-6 w-px bg-white/10 hidden sm:block"></div>
          </Link>

          {/* Right Side: Navigation Links & Actions (Desktop) */}
          <div className="hidden md:flex items-center space-x-2">

            {/* Nav Links */}
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive
                    ? "bg-neon-green/10 text-neon-green border border-neon-green/20"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                    }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              );
            })}

            {/* Vertical Divider */}
            <div className="h-6 w-px bg-white/10 mx-2"></div>

            {/* 🔥 Profile & Logout Actions */}
            <div className="flex items-center gap-4">
              <Link
                to="/CitizenProfile"
                className="flex items-center gap-2 group cursor-pointer"
                title="Edit Profile"
              >
                <div className="text-right hidden lg:block group-hover:opacity-80 transition-opacity">
                  <p className="text-sm font-bold text-white leading-tight">{citizenInfo.fullName}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 group-hover:bg-neon-green/10 group-hover:text-neon-green group-hover:border-neon-green/30 transition-all">
                  <User size={16} />
                </div>
              </Link>

              <button
                onClick={handleLogout}
                className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-gray-300 hover:text-neon-green transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#020617] border-b border-white/10 shadow-xl py-4 px-4 flex flex-col space-y-2">

          {/* Profile Link Mobile */}
          <Link
            to="/CitizenProfile"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-3 mb-2 border-b border-white/10 pb-4 hover:bg-white/5 p-2 rounded-xl transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300">
              <User size={18} />
            </div>
            <div>
              <p className="text-sm font-bold text-white leading-tight">{citizenInfo.fullName}</p>
              <p className="text-xs text-neon-green">View / Edit Profile</p>
            </div>
          </Link>

          {/* Mobile Nav Links */}
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${isActive
                  ? "bg-neon-green/10 text-neon-green border border-neon-green/20"
                  : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
              >
                {link.icon}
                {link.name}
              </Link>
            );
          })}

          <hr className="border-white/10 my-2" />

          {/* Mobile Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-left text-red-400 font-bold pt-2 p-2 rounded-xl hover:bg-red-500/10 transition-colors"
          >
            <LogOut size={18} /> Log Out
          </button>
        </div>
      )}
    </nav>
  );
}