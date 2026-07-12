import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Plus, Loader2, MapPin, Clock, AlertTriangle, CheckCircle2, Building2, Image as ImageIcon } from "lucide-react";

// 🔥 Firebase Imports
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase"; 

export default function TrackReport() {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Get Logged-in User
    const sessionData = JSON.parse(localStorage.getItem("evora_loggedInUser"));
    const citizenId = sessionData?.uid;

    if (!citizenId) {
      setLoading(false);
      return;
    }

    // 2. Fetch User's Specific Reports
    const q = query(
      collection(db, "reports"), 
      where("citizenId", "==", citizenId)
    );

    // 3. Real-time Listener (Updates instantly if admin changes status)
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedReports = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Sort newest first
      fetchedReports.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      
      setReports(fetchedReports);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching reports:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Helper: Format Date
  const formatDate = (isoString) => {
    if (!isoString) return "N/A";
    const date = new Date(isoString);
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  // Helper: Status Colors
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed': return "bg-green-500/10 text-green-400 border-green-500/30";
      case 'in progress': return "bg-blue-500/10 text-blue-400 border-blue-500/30";
      case 'rejected': return "bg-red-500/10 text-red-400 border-red-500/30";
      default: return "bg-yellow-500/10 text-yellow-400 border-yellow-500/30"; // Pending
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white font-inter flex flex-col">
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-6 pt-32 pb-20">

        <div className="bg-[#0a0f1b] border border-gray-800 rounded-3xl p-6 md:p-10 min-h-[60vh] flex flex-col shadow-2xl relative overflow-hidden">
          
          {/* Subtle background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-32 bg-[#00ff9d] opacity-[0.03] blur-[80px] pointer-events-none"></div>

          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 border-b border-gray-800 pb-6 gap-6 relative z-10">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">My Reports</h1>
              <p className="text-sm text-gray-400">Track the status of your civic issue submissions</p>
            </div>

            <button
              onClick={() => navigate("/Report")}
              className="bg-[#00ff9d10] text-[#00ff9d] border border-[#00ff9d40] px-5 py-2.5 rounded-full font-semibold hover:bg-[#00ff9d] hover:text-black hover:shadow-[0_0_15px_rgba(0,255,153,0.4)] transition-all flex items-center gap-2 active:scale-95"
            >
              <Plus size={18} /> Report New Issue
            </button>
          </div>

          {/* Content Section */}
          <div className="relative z-10 flex-1">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 text-[#00ff9d]">
                <Loader2 size={40} className="animate-spin mb-4" />
                <p className="text-gray-400 animate-pulse">Syncing with Municipal Database...</p>
              </div>
            ) : reports.length === 0 ? (
              /* Empty State */
              <div className="flex-1 flex flex-col items-center justify-center text-center py-10 h-full">
                <div className="w-20 h-20 bg-[#0c1320] border border-gray-800 rounded-full flex items-center justify-center text-gray-500 mb-6 group hover:border-[#00ff9d50] hover:text-[#00ff9d] transition-colors duration-300">
                  <FileText size={40} />
                </div>
                <h2 className="text-2xl font-bold text-white mb-3">No reports yet</h2>
                <p className="text-gray-400 mb-8 max-w-md">
                  Start making a difference by reporting your first issue. Track its status here once submitted.
                </p>
                <button
                  onClick={() => navigate("/Report")}
                  className="bg-[#00ff9d] text-black px-8 py-3.5 rounded-full font-extrabold hover:shadow-[0_0_20px_#00ff9d] transition-all active:scale-95 text-lg"
                >
                  Report an Issue
                </button>
              </div>
            ) : (
              /* Reports Grid */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reports.map((report) => (
                  <div key={report.id} className="bg-[#020617] border border-gray-800 hover:border-gray-700 transition-colors rounded-2xl overflow-hidden flex flex-col shadow-lg">
                    
                    {/* Image Header */}
                    {report.imageBase64 || report.imageUrl ? (
                      <div className="w-full h-40 bg-black relative">
                        <img 
                          src={report.imageBase64 || report.imageUrl} 
                          alt="Report" 
                          className="w-full h-full object-cover opacity-80"
                        />
                        <div className="absolute top-3 right-3">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border shadow-lg backdrop-blur-md ${getStatusColor(report.status)}`}>
                            {report.status || "Pending"}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-24 bg-[#050810] flex items-center justify-between px-4 relative border-b border-gray-800">
                         <div className="flex items-center gap-2 text-gray-600">
                           <ImageIcon size={20} /> <span className="text-xs font-bold uppercase">No Image</span>
                         </div>
                         <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(report.status)}`}>
                            {report.status || "Pending"}
                          </span>
                      </div>
                    )}

                    {/* Body */}
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                            report.severity === "Critical" ? "bg-red-500/10 text-red-500 border border-red-500/20" :
                            report.severity === "High" ? "bg-orange-500/10 text-orange-500 border border-orange-500/20" :
                            "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"
                        }`}>
                          {report.severity} Priority
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-bold text-white mb-2 line-clamp-1">{report.title}</h3>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-1">{report.description}</p>
                      
                      {/* Details Area */}
                      <div className="space-y-2 mt-auto pt-4 border-t border-gray-800/50">
                        {report.aiData?.assigned_department && (
                          <div className="flex items-start gap-2 text-xs text-gray-300">
                            <Building2 size={14} className="text-blue-400 mt-0.5 shrink-0" />
                            <span className="font-medium">Assigned to: {report.aiData.assigned_department}</span>
                          </div>
                        )}
                        <div className="flex items-start gap-2 text-xs text-gray-400">
                          <MapPin size={14} className="text-[#00ff9d] mt-0.5 shrink-0" />
                          <span className="truncate">Lat: {report.location?.lat?.toFixed(4)}, Lng: {report.location?.lng?.toFixed(4)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Clock size={14} className="shrink-0" />
                          <span>{formatDate(report.timestamp)}</span>
                        </div>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}