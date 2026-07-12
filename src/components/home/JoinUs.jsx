import { Users, BookOpen, ShieldCheck, Wrench } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const JoinUs = () => {
  const navigate = useNavigate();

  return (
    <section id="join" className="min-h-screen bg-black text-white py-20 px-6 w-full flex flex-col justify-center">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-16">
        <span className="text-[#00ff9d]">Join</span> The Mission
      </h1>

      {/* ✅ Changed to md:grid-cols-3 and max-w-6xl to perfectly center 3 cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 w-full">

        {/* Citizen Card */}
        <div className="p-8 rounded-2xl bg-[#0c0c0c] border border-[#00ff9d40] hover:border-[#00ff9d] hover:shadow-[0_0_25px_#00ff9d] transition-all duration-300 group flex flex-col">
          <div className="flex justify-center mb-6">
            <Users className="w-14 h-14 text-[#00ff9d] group-hover:scale-110 transition" />
          </div>
          <h2 className="text-2xl font-semibold text-center">
            Join as Citizen
          </h2>
          <p className="text-gray-300 text-center mt-3 flex-grow">
            Contribute to the environment & take part in real impact missions.
          </p>
          <div className="flex justify-center mt-6 text-center">
            <Link
              to="/CitizenAgreement"
              className="px-8 py-3 w-full rounded-full border border-[#00ff9d] text-[#00ff9d] hover:bg-[#00ff9d] hover:text-black transition-all duration-300 shadow-[0_0_10px_#00ff9d80] font-bold"
            >
              Join Now
            </Link>
          </div>
        </div>

        {/* Worker Card */}
        <div className="p-8 rounded-2xl bg-[#0c0c0c] border border-[#00ff9d40] hover:border-[#00ff9d] hover:shadow-[0_0_25px_#00ff9d] transition-all duration-300 group flex flex-col">
          <div className="flex justify-center mb-6">
            <Wrench className="w-14 h-14 text-[#00ff9d] group-hover:scale-110 transition" />
          </div>
          <h2 className="text-2xl font-semibold text-center">
            Join as Worker
          </h2>
          <p className="text-gray-300 text-center mt-3 flex-grow">
            Execute ground-level tasks and manage municipal cleanup operations.
          </p>
          <div className="flex justify-center mt-6 text-center">
            <Link
              to="/WorkerAgreement"
              className="px-8 py-3 w-full rounded-full border border-[#00ff9d] text-[#00ff9d] hover:bg-[#00ff9d] hover:text-black transition-all duration-300 shadow-[0_0_10px_#00ff9d80] font-bold"
            >
              Join Now
            </Link>
          </div>
        </div>

        {/* Admin Card */}
        <div className="p-8 rounded-2xl bg-[#0c0c0c] border border-[#00ff9d40] hover:border-[#00ff9d] hover:shadow-[0_0_25px_#00ff9d] transition-all duration-300 group flex flex-col">
          <div className="flex justify-center mb-6">
            <ShieldCheck className="w-14 h-14 text-[#00ff9d] group-hover:scale-110 transition" />
          </div>
          <h2 className="text-2xl font-semibold text-center">
            Admin Dashboard
          </h2>
          <p className="text-gray-300 text-center mt-3 flex-grow">
            Manage analytics, users, activities & environmental missions.
          </p>
          <div className="flex justify-center mt-6 text-center">
            <Link
              to="/AdminLogin"
              className="px-8 py-3 w-full rounded-full border border-[#00ff9d] text-[#00ff9d] hover:bg-[#00ff9d] hover:text-black transition-all duration-300 shadow-[0_0_10px_#00ff9d80] font-bold"
            >
              Login
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default JoinUs;