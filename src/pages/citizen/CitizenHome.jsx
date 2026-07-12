import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import GlobeScene from "../../components/citizen/GlobeScene";
import About from "./CitizenAbout";
import Events from "./Events";

const CitizenHome = () => {
    const [news] = useState([
        {
            title: "Clean Campus Drive",
            desc: "Students collected 50kg of plastic waste this week!",
            date: "Oct 25, 2025",
        },
        {
            title: "Water Conservation Quiz",
            desc: "Participate and earn up to 100 eco-points!",
            date: "Oct 28, 2025",
        },
        {
            title: "Tree Plantation Week",
            desc: "Join the local drive and upload your photos.",
            date: "Nov 2, 2025",
        },
        {
            title: "Recycling Workshop",
            desc: "Hands-on upcycling workshop for students.",
            date: "Nov 12, 2025",
        },
    ]);

    const StarBackground = () => {
        const canvasRef = useRef(null);

        useEffect(() => {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");
            let w = (canvas.width = window.innerWidth);
            let h = (canvas.height = window.innerHeight);

            const stars = Array.from({ length: 150 }).map(() => ({
                x: Math.random() * w,
                y: Math.random() * h,
                radius: Math.random() * 1.5,
                speed: 0.2 + Math.random() * 0.25
            }));

            const draw = () => {
                ctx.clearRect(0, 0, w, h);
                ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
                stars.forEach((s) => {
                    ctx.beginPath();
                    ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
                    ctx.fill();
                    s.x += s.speed;
                    if (s.x > w) {
                        s.x = 0;
                        s.y = Math.random() * h;
                    }
                });
                requestAnimationFrame(draw);
            };

            draw();

            const handleResize = () => {
                w = canvas.width = window.innerWidth;
                h = canvas.height = window.innerHeight;
            };

            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }, []);

        return (
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full z-0"
                style={{ background: "black" }}
            />
        );
    };

    return (
        <div className="bg-[#020617] text-white min-h-screen overflow-x-hidden font-inter">

            {/* HERO - FULL SCREEN */}
            <section
                id="home"
                className="relative w-full h-screen flex items-center justify-center overflow-hidden"
            >
                <StarBackground />

                <div className="absolute inset-0 z-10 flex items-center justify-center px-6">
                    <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-center lg:text-left"
                        >
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-neon-green drop-shadow-neon">
                                Learn. Play. Save the Planet.
                            </h1>
                            <p className="mt-4 text-gray-300 max-w-xl">
                                Evora turns environmental education into immersive experiences —
                                quizzes, real-world missions, rewards and an AI ecosystem to
                                guide students to measurable impact.
                            </p>
                            <div className="mt-8 flex flex-col sm:flex-row gap-4">
                                <motion.a
                                    whileHover={{ scale: 1.03 }}
                                    className="inline-block px-6 py-3 text-center rounded-full bg-neon-green text-black font-semibold shadow-[0_0_15px_rgba(0,255,153,0.4)]"
                                    href="#about"
                                >
                                    Explore Features
                                </motion.a>
                                <motion.a
                                    whileHover={{ scale: 1.03 }}
                                    className="inline-block px-6 py-3 text-center rounded-full border border-neon-green text-neon-green hover:bg-neon-green/10"
                                    href="#news"
                                >
                                    Latest News
                                </motion.a>
                            </div>
                            <div className="mt-6 flex gap-3 flex-wrap text-sm text-gray-400">
                                <span className="px-3 py-1 bg-white/5 rounded-full border border-white/10">
                                    School Competitions
                                </span>
                                <span className="px-3 py-1 bg-white/5 rounded-full border border-white/10">
                                    Eco-Points
                                </span>
                                <span className="px-3 py-1 bg-white/5 rounded-full border border-white/10">
                                    AI EcoMentor
                                </span>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="w-full h-[420px] md:h-[520px] lg:h-[520px]"
                        >
                            <GlobeScene />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ABOUT */}
            <div id="about">
                <About />
            </div>

            {/* NEWS & ASSIGNMENTS - HORIZONTAL CAROUSEL */}
            <section id="news" className="py-16 bg-[#040712]">
                <div className="max-w-7xl mx-auto px-6 md:px-8">
                    <motion.h3
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-2xl md:text-3xl font-bold text-neon-green mb-6"
                    >
                        News & Assignments
                    </motion.h3>

                    <div className="relative">
                        <div className="overflow-x-auto no-scrollbar snap-x snap-mandatory flex gap-6 pb-4">
                            {news.map((n, i) => (
                                <article
                                    key={i}
                                    className="snap-start min-w-[300px] md:min-w-[360px] bg-black/60 border border-gray-800 rounded-xl p-5 hover:border-neon-green/50 transition-colors"
                                >
                                    <h4 className="text-lg font-semibold text-white">
                                        {n.title}
                                    </h4>
                                    <p className="mt-2 text-gray-400 text-sm">{n.desc}</p>
                                    <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                                        <span>{n.date}</span>
                                        <button className="text-neon-green text-sm font-semibold hover:underline">
                                            View
                                        </button>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* EVENTS */}
            <div id="events">
                <Events />
            </div>

            {/* CONTACT */}
            <section id="contact" className="py-16 bg-[#040712]">
                <div className="max-w-5xl mx-auto px-6 md:px-8">
                    <motion.h3
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-2xl md:text-3xl font-bold text-neon-green mb-6 text-center"
                    >
                        Contact Us
                    </motion.h3>
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            placeholder="Name"
                            className="p-3 bg-transparent border border-gray-800 rounded-md focus:border-neon-green outline-none text-white transition-colors"
                        />
                        <input
                            placeholder="Email"
                            className="p-3 bg-transparent border border-gray-800 rounded-md focus:border-neon-green outline-none text-white transition-colors"
                        />
                        <textarea
                            placeholder="Message"
                            className="md:col-span-2 p-3 bg-transparent border border-gray-800 rounded-md focus:border-neon-green outline-none text-white transition-colors"
                            rows="5"
                        />
                        <div className="md:col-span-2 flex justify-end">
                            <button
                                type="button"
                                className="px-8 py-3 rounded-full bg-neon-green text-black font-bold hover:shadow-[0_0_15px_rgba(0,255,153,0.4)] transition-all active:scale-95"
                            >
                                Send Message
                            </button>
                        </div>
                    </form>
                </div>
            </section>

        </div>
    );
};

export default CitizenHome;