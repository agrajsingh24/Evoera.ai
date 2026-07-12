import React from "react";

export default function About() {
  return (
    <section
      id="about"
      className=" w-full mx-auto px-6 py-16 text-white font-semibold bg-black/95"
    
    >
      <div className="grid md:grid-cols-2 gap-10 items-center">

        {/* Left Content */}
        <div className="space-y-5">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-wide text-[#00ff9d] drop-shadow-[0_0_10px_#00ff9d90]">
            About Evora
          </h2>

          <p className="text-gray-300 leading-relaxed">
            Evora is a futuristic environmental platform designed to unite 
            citizens, students, and local organisations to create measurable 
            environmental progress across Uttarakhand.  
            Through AI-powered analytics, community reporting, and validation 
            tools, Evora builds a trustworthy ecosystem of real environmental impact.
          </p>

          <ul className="mt-4 space-y-2 text-gray-300">
            <li>  Community-verified environmental reporting</li>
            <li>  Local action projects tailored to district needs</li>
            <li>  Student learning, rewards & deep analytics</li>
          </ul>
        </div>

        {/* Right Side Newspaper Collage */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl overflow-hidden  hover:scale-105 transition-transform">
            <img
              alt="env1"
              src="https://png.pngtree.com/background/20250125/original/pngtree-eco-technology-technology-convergence-green-computing-and-it-ethics-picture-image_15459257.jpg"
              className="w-full h-48 object-cover brightness-[0.75]"
            />
          </div>

          <div className="rounded-xl overflow-hidden  hover:scale-105 transition-transform">
            <img
              alt="env2"
              src="https://t4.ftcdn.net/jpg/16/06/82/83/360_F_1606828373_gnBA8sxfHcwO7B1I21raG2cNyIatoe44.jpg"
              className="w-full border-amber-50 h-48 object-cover brightness-[0.75]"
            />
          </div>

          <div className="col-span-2 rounded-xl overflow-hidden le-105 transition-transform">
            <img
              alt="env3"
              src="https://cdn.vectorstock.com/i/500p/93/47/sustainable-world-environment-vector-26779347.jpg"
              className="w-full h-60 object-cover brightness-[0.75]"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
