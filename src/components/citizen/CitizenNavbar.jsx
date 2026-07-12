import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Leaf, User, LogOut, Menu, X, Activity } from "lucide-react";

// 🔥 Import Firebase Auth for secure logout
import { getAuth, signOut } from "firebase/auth";

export default function CitizenNavbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const auth = getAuth(); // Initialize Firebase Auth

    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [citizenInfo, setCitizenInfo] = useState({ fullName: "Eco Citizen" });

    // 1. Handle scroll effect for glassmorphism
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // 2. Fetch user data from localStorage
    useEffect(() => {
        try {
            const storedData = localStorage.getItem("evora_loggedInUser");

            if (storedData) {
                const parsedData = JSON.parse(storedData);

                // Set the name using the 'username' property from your data
                if (parsedData && parsedData.username) {
                    setCitizenInfo({ fullName: parsedData.username });
                }
            }
        } catch (error) {
            console.error("Failed to parse citizen data from local storage:", error);
        }
    }, []);

    // 🔥 Upgraded Logout function to disconnect from Firebase
    const handleLogout = async () => {
        try {
            await signOut(auth); // Securely end the Firebase session
            localStorage.removeItem("evora_loggedInUser");
            navigate("/");
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    // 3. Helper component for hash links to work from any page
    const NavAnchor = ({ href, children }) => {
        // If we are already on CitizenHome, just use the hash to smooth scroll
        const isHome = location.pathname === "/CitizenHome";
        const target = isHome ? href : `/CitizenHome${href}`;

        return (
            <a
                href={target}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-300 hover:text-[#00ff9d] font-medium transition-colors cursor-pointer"
            >
                {children}
            </a>
        );
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? "bg-[#020617]/95 backdrop-blur-md border-b border-[#00ff9d]/20 shadow-lg py-3"
                : "bg-transparent py-5"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 md:px-8">
                <div className="flex justify-between items-center">

                    {/* Logo */}
                    <Link to="/CitizenHome" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 rounded-full bg-[#00ff9d]/10 border border-[#00ff9d]/30 flex items-center justify-center group-hover:shadow-[0_0_15px_rgba(0,255,153,0.4)] transition-all">
                            <Leaf size={20} className="text-[#00ff9d]" />
                        </div>
                        <span className="font-bold text-xl text-white tracking-wide">
                            EVORA <span className="text-[#00ff9d] font-normal text-sm border-l border-white/20 pl-2 ml-1">Citizen</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <NavAnchor href="#home">Home</NavAnchor>
                        <NavAnchor href="#about">About</NavAnchor>
                        <NavAnchor href="#news">News</NavAnchor>
                        <NavAnchor href="#events">Events</NavAnchor>
                        <NavAnchor href="#contact">Contact</NavAnchor>
                    </div>

                    {/* Right Side Actions (Desktop) */}
                    <div className="hidden md:flex items-center gap-6">

                        {/* ✅ THE FIX: Wrapped in a Link to /CitizenProfile with hover effects */}
                        <Link
                            to="/CitizenProfile"
                            className="flex items-center gap-3 group cursor-pointer"
                            title="Edit Profile"
                        >
                            <div className="text-right group-hover:opacity-80 transition-opacity">
                                <p className="text-sm font-bold text-white leading-tight">{citizenInfo.fullName}</p>
                                <p className="text-[10px] text-[#00ff9d]">Eco-Warrior</p>
                            </div>
                            <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 group-hover:bg-[#00ff9d]/10 group-hover:text-[#00ff9d] group-hover:border-[#00ff9d]/30 transition-all">
                                <User size={16} />
                            </div>
                        </Link>

                        <button
                            onClick={handleLogout}
                            className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                            title="Logout"
                        >
                            <LogOut size={20} />
                        </button>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden text-white hover:text-[#00ff9d] transition-colors"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-[#020617] border-b border-white/10 shadow-xl py-4 px-6 flex flex-col space-y-4">

                    {/* ✅ THE FIX: Added Profile Link to Mobile Menu */}
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
                            <p className="text-xs text-[#00ff9d]">View / Edit Profile</p>
                        </div>
                    </Link>

                    <NavAnchor href="#home">Home</NavAnchor>
                    <NavAnchor href="#about">About</NavAnchor>
                    <NavAnchor href="#news">News</NavAnchor>
                    <NavAnchor href="#events">Events</NavAnchor>
                    <NavAnchor href="#contact">Contact</NavAnchor>
                    <hr className="border-white/10" />
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