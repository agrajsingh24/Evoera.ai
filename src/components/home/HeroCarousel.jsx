import React, { useEffect, useState, useRef } from "react";

import poster1 from '../../assets/banner1.png'
import poster2 from '../../assets/banner2.png'
import poster3 from '../../assets/banner3.png'

const slides = [
  {
    title: "Community-driven environmental action",
    subtitle: "Record, verify, and get rewarded for protecting nature",
    img: poster3,
  },
  {
    title: "Student programs & local projects",
    subtitle: "Hands-on learning paired with real-world impact",
    img: poster1,
  },
  {
    title: "Verified reports & analytics",
    subtitle: "Data stakeholders can trust",
    img: poster2,
  },
];

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4500);

    return () => {
      mounted.current = false;
      clearInterval(id);
    };
  }, []);

  return (
    <section id="home" className="w-full h-screen p-0 m-0 overflow-hidden">
      <div
        className="relative w-full h-full overflow-hidden
        shadow-[0_0_25px_#00ff9d40]
        border border-[#00ff9d30]
        bg-black"
      >
        <div className="absolute inset-0 h-full w-full">
          {slides.map((s, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-opacity duration-700 ${
                i === index ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              {/* Background Image */}
              <img
                src={s.img}
                alt={s.title}
                className="h-full w-full object-cover brightness-[0.45] saturate-125"
              />
            

              {/* Centered Dark Vignette */}
              <div
                className="absolute inset-0 pointer-events-none
                  bg-[radial-linear(circle,transparent_40%,rgba(0,0,0,0.85)_100%)]"
              ></div>

              {/* Left Shadow */}
              <div className="absolute left-0 top-0 h-full w-32 bg-linear-to-r from-black/80 to-transparent"></div>

              {/* Right Shadow */}
              <div className="absolute right-0 top-0 h-full w-32 bg-linear-to-l from-black/80 to-transparent"></div>

              {/* Top Shadow */}
              <div className="absolute top-0 left-0 w-full h-32 bg-linear-to-b from-black/80 to-transparent"></div>

              {/* Bottom Shadow */}
              <div className="absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-black/80 to-transparent"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}