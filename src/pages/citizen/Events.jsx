// File: src/sections/Events.jsx
import React from "react";
import { motion } from "framer-motion";

export default function Events() {
  const events = [
    {
      title: "Green Campus Challenge",
      date: "Nov 10, 2025",
      desc: "Participate in a campus-wide challenge to promote waste segregation and earn eco-points for your school!",
      type: "Challenge",
    },
    {
      title: "Water Conservation Quiz",
      date: "Nov 15, 2025",
      desc: "Test your knowledge on water-saving practices and win exciting rewards. Open for all students.",
      type: "Quiz",
    },
    {
      title: "Biodiversity Awareness Quiz",
      date: "Nov 20, 2025",
      desc: "Learn about India's flora and fauna through this fun interactive quiz — earn green tokens and badges!",
      type: "Quiz",
    },
    {
      title: "Sustainability Innovators Summit",
      date: "Nov 25, 2025",
      desc: "A virtual summit showcasing student innovations for a sustainable future. Join live and get inspired.",
      type: "Event",
    },
  ];

  return (
    <section id="events" className="py-20 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-green-400 mb-10"
        >
          Upcoming Events & Quizzes
        </motion.h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((e, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="relative p-6 rounded-2xl border border-green-400/20 bg-black/60 backdrop-blur-sm shadow-[0_0_20px_rgba(0,255,153,0.1)] hover:shadow-[0_0_30px_rgba(0,255,153,0.3)]"
            >
              {/* Event Header */}
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-gray-100">{e.title}</h4>
                <span className="text-sm text-green-400">{e.date}</span>
              </div>

              {/* Event Description */}
              <p className="mt-3 text-gray-400 text-sm leading-relaxed">{e.desc}</p>

              {/* Join Button */}
              <div className="mt-5">
                <button
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                    e.type === "Quiz"
                      ? "bg-green-400 text-black hover:bg-green-500"
                      : "bg-transparent border border-green-400 text-green-400 hover:bg-green-400 hover:text-black"
                  }`}
                >
                  {e.type === "Quiz" ? "Join Quiz" : "Join Event"}
                </button>
              </div>

              {/* Subtle neon glow behind card */}
              <div className="absolute inset-0 rounded-2xl bg-green-400/5 blur-xl -z-10" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[40rem] bg-green-500/5 blur-[150px] rounded-full pointer-events-none" />
    </section>
  );
}
