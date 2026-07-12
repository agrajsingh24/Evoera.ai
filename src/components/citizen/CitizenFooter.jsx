import React from "react";
import { FaInstagram, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 border-t border-gray-800 py-10 px-8 md:px-20 overflow-hidden relative">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Column 1 - About */}
        <div>
          <h2 className="text-3xl font-extrabold mb-4 text-green-400 tracking-wide">
            Evora
          </h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            Evora is a next-generation eco-learning platform designed to make
            environmental awareness fun, interactive, and impactful.
          </p>
          <div className="flex gap-5 mt-6">
            <a href="#" className="hover:text-green-400 transition-transform hover:scale-110">
              <FaInstagram size={22} />
            </a>
            <a href="#" className="hover:text-green-400 transition-transform hover:scale-110">
              <FaTwitter size={22} />
            </a>
            <a href="#" className="hover:text-green-400 transition-transform hover:scale-110">
              <FaLinkedin size={22} />
            </a>
            <a href="#" className="hover:text-green-400 transition-transform hover:scale-110">
              <FaGithub size={22} />
            </a>
          </div>
        </div>

        {/* Column 2 - Important Links */}
        <div>
          <h3 className="text-lg font-semibold text-green-400 mb-4">
            Important Links
          </h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-green-400 transition">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-green-400 transition">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-green-400 transition">
                Support
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-green-400 transition">
                Feedback
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3 - Leaderboard / Recognition */}
        <div>
          <h3 className="text-lg font-semibold text-green-400 mb-4">
            Top Contributors
          </h3>
          <ul className="space-y-3 relative">
            <li className="flex items-center gap-2 floating-gold">
              <span className="text-yellow-400 font-bold text-lg">🥇</span>
              <span className="text-yellow-400 font-semibold drop-shadow-[0_0_6px_gold]">
                #1 EcoWarrior - Akshat Kala
              </span>
            </li>
            <li className="flex items-center gap-2 floating-silver">
              <span className="text-gray-300 font-bold text-lg">🥈</span>
              <span className="text-gray-300 font-semibold drop-shadow-[0_0_6px_silver]">
                #2 GreenMind - Shankar Joshi
              </span>
            </li>
            <li className="flex items-center gap-2 floating-bronze">
              <span className="text-orange-400 font-bold text-lg">🥉</span>
              <span className="text-orange-400 font-semibold drop-shadow-[0_0_6px_brown]">
                #3 NatureNerd - Agraj Singh
              </span>
            </li>
            <li className="text-gray-400 mt-3 text-sm">
              <u><a href="/ecolearning">Join our leaderboard</a></u> by contributing to nature!
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-10 pt-5 text-center text-sm text-gray-500">
        © {new Date().getFullYear()}{" "}
        <span className="text-green-400 font-semibold">Evora</span>. All rights
        reserved.
      </div>

      {/* Floating animation styles */}
      <style jsx>{`
        @keyframes floatGold {
          0% {
            transform: translateY(0px);
            filter: drop-shadow(0 0 8px gold);
          }
          50% {
            transform: translateY(-6px);
            filter: drop-shadow(0 0 15px gold);
          }
          100% {
            transform: translateY(0px);
            filter: drop-shadow(0 0 8px gold);
          }
        }

        @keyframes floatSilver {
          0% {
            transform: translateY(0px);
            filter: drop-shadow(0 0 8px silver);
          }
          50% {
            transform: translateY(-4px);
            filter: drop-shadow(0 0 12px silver);
          }
          100% {
            transform: translateY(0px);
            filter: drop-shadow(0 0 8px silver);
          }
        }

        @keyframes floatBronze {
          0% {
            transform: translateY(0px);
            filter: drop-shadow(0 0 8px #cd7f32);
          }
          50% {
            transform: translateY(-3px);
            filter: drop-shadow(0 0 12px #cd7f32);
          }
          100% {
            transform: translateY(0px);
            filter: drop-shadow(0 0 8px #cd7f32);
          }
        }

        .floating-gold {
          animation: floatGold 3s ease-in-out infinite;
        }
        .floating-silver {
          animation: floatSilver 3s ease-in-out infinite;
        }
        .floating-bronze {
          animation: floatBronze 3s ease-in-out infinite;
        }
      `}</style>
    </footer>
  );
}
