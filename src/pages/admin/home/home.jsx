import React from "react";

// ==========================================
// IMPORTING ALL LANDING PAGE SECTIONS
// ==========================================
// Note: Double-check these paths! If you didn't move these into a 'home' 
// subfolder yet, you might need to change it to "../../components/HeroCarousel"
import HeroCarousel from "../../components/home/HeroCarousel";
import HomeAbout from "../../components/home/HomeAbout"; // This was your root About.jsx
import JoinUs from "../../components/home/JoinUs";
import GraphSection from "../../components/home/GraphSection";
import Features from "../../components/home/Features";
import Analytics from "../../components/home/Analytics";
import Contact from "../../components/home/Contact";

export default function Home() {
    return (
        <>
            {/* We do NOT include Navbar or Footer here because 
        MainLayout.jsx is already wrapping this page with them! 
      */}
            <HeroCarousel />
            <HomeAbout />
            <JoinUs />
            <GraphSection />
            <Features />
            <Analytics />
            <Contact />
        </>
    );
}