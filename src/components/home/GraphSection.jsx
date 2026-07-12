import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", Tuns: 220 },
  { name: "Feb", Tuns: 180 },
  { name: "Mar", Tuns: 150 },
  { name: "Apr", Tuns: 120 },
  { name: "May", Tuns: 90 },
  { name: "Jun", Tuns: 60 },
];

export default function GraphSection() {
  return (
    <section
      id="analytics"
      className="mx-auto px-6 py-20 
      bg-[#080e0a] text-white relative overflow-hidden"
    >
      {/* BG Glow — subtle + aesthetic (not scary) */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-green-500/20 blur-[140px] rounded-full"></div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">

        {/* LEFT DESCRIPTION */}
        <div className="md:w-1/2">
          <h3 className="text-4xl font-bold mb-6 text-green-400">
            Carbon Footprint Reduction Analytics
          </h3>

          <p className="text-gray-300 leading-relaxed mb-6 text-lg">
            This visual analysis highlights how Evora users help reduce 
            carbon emissions over time. As more people participate in 
            eco-friendly activities like waste reporting, recycling, and 
            community clean-ups, the monthly carbon footprint gradually 
            declines — demonstrating real, measurable environmental impact.
          </p>

          <p className="text-gray-400 leading-relaxed text-md">
            The graph on the right reflects a consistent drop in CO₂ levels 
            from January to June, indicating improved sustainability habits 
            driven by the Evora community. This data helps us identify trends, 
            understand user behavior, and scale environmental initiatives 
            more effectively.
          </p>
        </div>

        {/* RIGHT SIDE — GRAPH */}
        <div
          className="md:w-1/2 rounded-2xl backdrop-blur-xl bg-white/10 p-6 
          border border-white/10 shadow-2xl animate-fadeIn"
        >
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="evoraGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22c55e" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <XAxis dataKey="name" stroke="#cbd5e1" />
                <YAxis stroke="#cbd5e1" />
                <Tooltip
                  contentStyle={{
                    background: "rgba(20, 40, 20, 0.8)",
                    border: "1px solid #14532d",
                    color: "white",
                  }}
                />

                <Area
                  type="monotone"
                  dataKey="Tuns"
                  stroke="#22c55e"
                  strokeWidth={3}
                  fill="url(#evoraGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </section>
  );
}
