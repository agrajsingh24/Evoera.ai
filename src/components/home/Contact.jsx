import React from "react";
import { Send } from "lucide-react";

export default function Contact() {
  return (
    <section
      id="contact"
      className="min-h-screen w-full flex justify-center items-center px-5 py-10 bg-black relative"
    >
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-br from-black via-black to-green-900/20"></div>

      {/* CONTACT CARD CENTERED */}
      <div
        className="relative z-10 w-full max-w-3xl bg-white/5 backdrop-blur-xl 
        border border-white/10 shadow-xl rounded-2xl p-10"
      >
        {/* Title */}
        <h3 className="text-4xl font-bold text-green-500 text-center mb-4">
          Contact Us
        </h3>

        <p className="text-gray-300 text-center mb-10 max-w-xl mx-auto">
          Have questions, suggestions, or want to collaborate? Send us a message
          — our team will reach out shortly.
        </p>

        {/* FORM */}
        <form className="space-y-6">
          {/* Name + Email */}
          <div className="grid md:grid-cols-2 gap-6">
            <input
              className="w-full p-4 rounded-xl bg-white/10 border border-white/20 
              text-white placeholder-gray-400 focus:outline-none"
              placeholder="Full name"
            />

            <input
              className="w-full p-4 rounded-xl bg-white/10 border border-white/20 
              text-white placeholder-gray-400 focus:outline-none"
              placeholder="Email"
            />
          </div>

          {/* Subject */}
          <input
            className="w-full p-4 rounded-xl bg-white/10 border border-white/20 
            text-white placeholder-gray-400 focus:outline-none"
            placeholder="Subject"
          />

          {/* Message */}
          <textarea
            rows={6}
            className="w-full p-4 rounded-xl bg-white/10 border border-white/20 
            text-white placeholder-gray-400 focus:outline-none"
            placeholder="Message"
          ></textarea>

          {/* Submit Button */}
          <button
            className="w-full flex justify-center items-center gap-2 px-6 py-4 
            rounded-xl bg-green-500 text-black font-bold tracking-wide
            hover:bg-green-400 active:scale-95 
            shadow-[0_0_20px_#00ff9d80] transition-all"
          >
            <Send size={18} /> Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
