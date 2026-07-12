// File: src/sections/About.jsx
import React from "react";
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import {
  FaRobot,
  FaLeaf,
  FaGlobeAsia,
  FaBrain,
  FaCoins,
  FaPassport,
  FaRemoveFormat,
  FaStore,
} from "react-icons/fa";
import { MdCampaign, MdLeaderboard } from "react-icons/md";
import { GiTrophyCup } from "react-icons/gi";
import { FaPeoplePulling } from "react-icons/fa6";

const features = [
  {
    title: "CivicFlow Reporting",
    link: "/CitizenDashboard",
    icon: <FaLeaf className="text-green-400 text-3xl mb-3" />,
    short: "See it. Report it. Resolve it.",
    detail: "Empowering citizens to build cleaner, safer, and smarter cities through AI-driven issue reporting and tracking.",
  },
  {
    title: "Civic Book",
    link: "/CivicBook",
    icon: <Users className="text-[#00ff9d] w-8 h-8 mb-3" />,
    short: "Local civic issue feed.",
    detail: "A location-based community feed where citizens view, upvote, and prioritize civic issues within a 3km radius."
  },
  {
    title: "Mission and Quest",
    link: "/missionandquest",
    icon: <FaBrain className="text-green-400 text-3xl mb-3" />,
    short: "Small tasks. Big Eco-Impact.",
    detail:
      "Daily real-world eco-actions integrated with in-app challenges. Complete tasks, upload proof, gain XP and Eco-Coins. Learning becomes an adventure.",
  },
  {
    title: "Social and Peer Interaction",
    link: "/feed",
    icon: <FaPeoplePulling className="text-green-400 text-3xl mb-3" />,
    short: "Eco-actions become social wins.",
    detail:
      "Students cheer, comment, and collaborate in squads. Community spirit drives consistent green habits.",
  },
  {
    title: "Campaigns",
    link: "/campaign",
    icon: <MdCampaign className="text-green-400 text-3xl mb-3" />,
    short: "Seasonal eco-events. Fresh Excitements.",
    detail:
      "Timely eco-events and limited-time missions keep excitement alive and engagement high throughout the year.",
  },
  {
    title: "Leaderboard and Competitions",
    link: "/LeaderboardAndCompetition",
    icon: <MdLeaderboard className="text-green-400 text-3xl mb-3" />,
    short: "Track your eco-journey.",
    detail:
      "Class, school, and regional rankings spark healthy rivalry. Team battles and green championships boost motivation and participation.",
  },
  {
    title: "Rewards",
    link: "/rewards",
    icon: <GiTrophyCup className="text-green-400 text-3xl mb-3" />,
    short: "Earn for every green step.",
    detail:
      "Badges, unlockables, and real impact rewards like planting a tree. ",
  },
  {
    title: "Reward Store",
    link: "/rewardstore",
    icon: <FaStore className="text-green-400 text-3xl mb-3" />,
    short: "Trade Eco-coins for real change.",
    detail:
      "Every achievement feels valuable and worth chasing. Cashifying the eco coins. ",
  },
  {
    title: "Eco Buddy Store",
    link: "/chatbot",
    icon: <FaRobot className="text-green-400 text-3xl mb-3" />,
    short: "Get instant answers to your questions.",
    detail:
      "An AI-powered chatbot that provides quick and accurate responses to your environmental queries, helping you learn on the go.",
  },
];

export default function About() {
  return (
    <section id="about" className="py-20 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-green-400 mb-6"
        >
          About Evora
        </motion.h2>

        <p className="text-gray-300 max-w-3xl mb-12">
          Evora bridges classroom theory with real-world environmental action
          using gamification, AI verification, and a token-backed reward system.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, idx) => (
            <motion.div
              key={f.title}
              className="relative group p-6 rounded-2xl border border-green-400/20 bg-black/60 backdrop-blur-sm transition-all hover:shadow-[0_0_20px_rgba(0,255,153,0.3)]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
            >
              <a href={f.link || "#"} className="z-10 relative">
                <div className="flex flex-col items-start text-left">
                  {f.icon}

                  <h3 className="text-xl font-semibold text-green-400 mb-2">
                    {f.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{f.short}</p>
                </div>
              </a>

              {/* Hidden Drawer */}
              <motion.div
                className="absolute inset-0 bg-black/95 text-gray-200 p-6 rounded-2xl flex flex-col justify-center items-start opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300"
                initial={{ y: 50, opacity: 0 }}
                whileHover={{ y: 0, opacity: 1 }}
              >
                {f.icon}
                <h4 className="text-xl font-bold text-green-400 mb-2">
                  {f.title}
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {f.detail}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Glow background overlay */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[40rem] bg-green-500/5 blur-[160px] rounded-full pointer-events-none" />
    </section>
  );
}
