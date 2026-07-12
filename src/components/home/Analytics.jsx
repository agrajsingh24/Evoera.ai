import React, { useEffect, useState } from "react";

// ===== COUNTER HOOK =====
const useCounter = (target, duration = 1500, trigger) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;

    let start = 0;
    const end = parseInt(target.toString().replace(/[^0-9]/g, "")); 
    const increment = end / (duration / 16);

    const animate = () => {
      start += increment;
      if (start < end) {
        setCount(Math.floor(start));
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [trigger]);

  return count;
};

const stats = [
  { val: 12000, suffix: "+", label: "Actions Logged" },
  { val: 850, suffix: "+", label: "Verified Volunteers" },
  { val: 220, suffix: "", label: "Local Projects" },
  { val: 98, suffix: "%", label: "Report Accuracy" },
];

export default function Analytics() {
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    setTimeout(() => setTrigger(true), 200);
  }, []);

  return (
    <section id="analytics" className="mx-auto px-6 py-20 relative">
      <div className="absolute inset-0 bg-linear-to-tl bg-black/90 to-transparent "></div>

      <h3 className="relative z-10 text-3xl font-bold mb-10 text-white">
        Impact in Numbers
      </h3>

      <div className="relative z-10 grid md:grid-cols-4 gap-6">
        {stats.map((s, i) => {
          const animated = useCounter(s.val, 1500, trigger);

          return (
            <div
              key={i}
              className="rounded-2xl p-8 text-center
              bg-white/10 backdrop-blur-xl
              border border-white/10
              shadow-xl 
              hover:bg-white/20 hover:-translate-y-1 hover:shadow-2xl
              transition-all duration-300"
            >
              <div className="text-4xl md:text-5xl font-extrabold text-green-400 drop-shadow-sm">
                {animated.toLocaleString()}{s.suffix}
              </div>

              <div className="mt-2 text-gray-300">{s.label}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
