import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CitizenAgreement() {
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!checked) {
      setError("⚠️ You must accept the agreement to continue.");
      return;
    }

    localStorage.setItem("citizenAgreementAccepted", "true");
    navigate("/CitizenLogin");
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="bg-[#0a0a0a] border border-[#00ff9d40] shadow-[0_0_25px_#00ff9d20] rounded-2xl p-8 max-w-2xl w-full">
        
        <h1 className="text-3xl font-bold text-[#00ff9d] mb-4 text-center">
          Citizen Participation & Conduct Agreement
        </h1>

        {/* Scrollable Agreement Box */}
        <div className="bg-black/40 border border-[#00ff9d30] rounded-xl p-5 h-80 overflow-y-scroll text-gray-200 space-y-4 text-sm leading-relaxed">

          <p className="text-[#00ff9d] font-semibold text-lg">
            By participating in this platform, every citizen agrees to uphold
            integrity, responsibility, and respectful conduct to ensure a safe,
            transparent, and effective experience for all users.
          </p>

          <p>
            ● I agree to provide accurate, lawful, and verifiable information
            whenever participating in activities, submissions, or verification
            processes on this platform.
          </p>

          <p>
            ● I understand that the platform is designed to promote transparency,
            growth, public welfare, and community development, and I will use 
            all features responsibly.
          </p>

          <p>
            ● I agree not to misuse any tools, features, digital systems, or
            communication channels available on the platform. Any attempt to 
            manipulate data, mislead others, or exploit the system is strictly 
            prohibited.
          </p>

          <p>
            ● I will maintain a respectful and professional tone in all my
            interactions. Harassment, abusive language, discrimination, or
            threatening behavior towards other citizens or team members will
            not be tolerated.
          </p>

          <p>
            ● I commit to participating in community activities, reporting 
            relevant issues responsibly, and contributing positively to the 
            platform’s environment.
          </p>

          <p>
            ● I agree not to distribute or share confidential information, 
            internal data, or restricted documents without authorized 
            permission from the platform.
          </p>

          <p>
            ● I acknowledge that the platform may monitor activity and 
            interactions to maintain fairness, safety, and a transparent 
            ecosystem for all involved.
          </p>

          <p>
            ● I accept that any attempt to spread misinformation, create 
            unnecessary conflict, or misuse communication channels may result 
            in restricted access or permanent suspension.
          </p>

          <p>
            ● I understand that any technical misuse, including unauthorized 
            access attempts or system manipulation, will lead to strict 
            disciplinary action.
          </p>

          <p>
            ● I agree to follow all rules, guidelines, and updates issued by 
            the administration to ensure smooth functioning of the platform.
          </p>

          <p>
            ● I accept that violation of any policy mentioned in this agreement 
            may result in warnings, restricted access, termination, or other 
            necessary actions.
          </p>

          <p className="font-semibold text-[#00ff9d]">
            By accepting this agreement, I confirm that I have read, understood,
            and agree to comply with all responsibilities and rules mentioned 
            above.
          </p>

        </div>

        {/* Checkbox */}
        <div className="flex items-center gap-3 mt-6">
          <input
            type="checkbox"
            className="h-5 w-5 cursor-pointer accent-[#00ff9d]"
            checked={checked}
            onChange={() => setChecked(!checked)}
          />
          <label className="text-gray-200 text-sm cursor-pointer">
            I agree to all the responsibilities mentioned above.
          </label>
        </div>

        {/* Error */}
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        {/* Button */}
        <button
          onClick={handleSubmit}
          className="mt-6 w-full py-3 rounded-xl bg-[#00ff9d] text-black font-semibold hover:shadow-[0_0_20px_#00ff9d] transition"
        >
          Accept & Continue
        </button>
      </div>
    </div>
  );
}