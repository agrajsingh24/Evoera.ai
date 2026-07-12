import React from "react";
import {
  ShieldCheck,
  Gift,
  GraduationCap,
  Network,
  BarChart3,
  WifiOff,
} from "lucide-react";

const features = [
  {
    title: "Verified Reports",
    desc: "Every report passes through community cross-checking, ensuring that data stays 100% reliable and transparent.",
    icon: <ShieldCheck size={32} />,
  },
  {
    title: "Local Rewards",
    desc: "Users earn points, badges and real-world local benefits for contributing positively to Uttarakhand’s environment.",
    icon: <Gift size={32} />,
  },
  {
    title: "Student Programs",
    desc: "College and school students can participate in guided environmental tasks, internships and research activities.",
    icon: <GraduationCap size={32} />,
  },
  {
    title: "Partner Network",
    desc: "Evora connects NGOs, government bodies and verified organisations under one ecosystem to take collective action.",
    icon: <Network size={32} />,
  },
  {
    title: "Smart Analytics",
    desc: "Interactive dashboards help stakeholders track carbon reduction, waste patterns and monthly citizen activity.",
    icon: <BarChart3 size={32} />,
  },
  {
    title: "Offline Support",
    desc: "Evora works smoothly even with low connectivity so remote villages can still upload tasks and submit reports.",
    icon: <WifiOff size={32} />,
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="bg-black mx-auto px-6 py-20 relative"
    >
      <div className="absolute inset-0 bg-linear-to-br bg-black to-transparent blur-3xl"></div>

      <div className="relative z-10">
        <h3 className="text-3xl font-bold mb-10 text-white tracking-wide">
          What Makes Evora Unique
        </h3>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-white/10 backdrop-blur-xl 
              border border-white/10 shadow-xl
              hover:bg-white/15 hover:shadow-2xl hover:-translate-y-1
              transition-all duration-300"
            >
              <div className="text-green-400 mb-4">{f.icon}</div>

              <h4 className="font-semibold text-xl text-white">
                {f.title}
              </h4>

              <p className="text-gray-300 mt-2 leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
