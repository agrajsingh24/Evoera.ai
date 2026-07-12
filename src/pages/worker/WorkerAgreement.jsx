import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function WorkerAgreement() {
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!checked) {
      setError("⚠️ You must accept the agreement to continue.");
      return;
    }

    localStorage.setItem("citizenAgreementAccepted", "true");
    navigate("/WorkerLogin");
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="bg-[#0a0a0a] border border-[#00ff9d40] shadow-[0_0_25px_#00ff9d20] rounded-2xl p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-[#00ff9d] mb-4 text-center">
          Worker Participation & Conduct Agreement
        </h1>

        {/* Scrollable Agreement Box */}
        <div className="bg-black/40 border border-[#00ff9d30] rounded-xl p-5 h-80 overflow-y-scroll text-gray-200 space-y-4 text-sm leading-relaxed">
          <p className="text-[#00ff9d] font-semibold text-lg">
            By joining as a worker on this platform, I agree to adhere to
            professional, ethical, and safe conduct to ensure a productive and
            secure environment for all participants.
          </p>

          <p>
            ● I agree to perform assigned tasks diligently, accurately, and
            within the stipulated timelines while maintaining quality standards.
          </p>

          <p>
            ● I understand that the platform aims to foster efficiency,
            accountability, and worker welfare, and I will utilize all tools
            responsibly.
          </p>

          <p>
            ● I agree not to misuse any platform tools, features, or
            communication channels. Attempts to manipulate data, misreport work,
            or exploit the system are strictly prohibited.
          </p>

          <p>
            ● I will maintain a professional and respectful tone in all
            communications. Harassment, abusive language, discrimination, or
            threatening behavior toward colleagues, supervisors, or clients will
            not be tolerated.
          </p>

          <p>
            ● I commit to providing timely updates, reporting issues
            responsibly, and contributing positively to the work environment.
          </p>

          <p>
            ● I agree to protect confidential information, internal data, and
            proprietary documents and will not share them without explicit
            authorization.
          </p>

          <p>
            ● I acknowledge that the platform may monitor work activity to
            ensure transparency, fairness, and safety for all workers and
            clients.
          </p>

          <p>
            ● I accept that spreading misinformation, disrupting workflows, or
            misusing communication channels may result in restricted access,
            suspension, or termination.
          </p>

          <p>
            ● I understand that any unauthorized access, manipulation of
            systems, or technical misuse will lead to strict disciplinary
            actions.
          </p>

          <p>
            ● I agree to comply with all platform rules, guidelines, and updates
            issued by administration to ensure smooth operations.
          </p>

          <p>
            ● I accept that violation of any policy in this agreement may result
            in warnings, suspension, termination, or other necessary actions.
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
