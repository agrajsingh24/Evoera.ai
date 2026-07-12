import React from "react";
import Navbar from "./Navbar";
import GlobeScene from "./GlobeScene";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function Home() {

  return (
    <div className="relative min-h-screen z-20 text-white overflow-hidden">

      {/* 🌍 Hero Section with Globe */}
      <section className="h-screen w-full relative z-10 flex flex-col justify-center items-start px-16 md:px-32">
        <GlobeScene />

        <div className="absolute inset-0 flex flex-col justify-center items-start px-16 md:px-32 z-20">
          <h1 className="text-5xl md:text-7xl font-bold text-green-400 drop-shadow-lg">
            Welcome to EcoVision
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-lg">
            Empowering a sustainable future with AI-driven environmental solutions.
          </p>
          <button className="mt-6 px-6 py-3 bg-green-500 text-black rounded-lg font-semibold hover:bg-green-400 transition-all">
            Explore Now
          </button>
        </div>
      </section>
    </div>
  );
}
