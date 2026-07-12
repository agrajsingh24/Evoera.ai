import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// ==========================================
// LAYOUTS (These handle your different Navbars)
// ==========================================
import CitizenLayout from "./layouts/CitizenLayout";
import CivicFlowLayout from "./layouts/CivicFlowLayout";
import AdminLayout from "./layouts/AdminLayout";


// Citizen Pages
import CitizenAgreement from "./pages/citizen/CitizenAgreement";
import CitizenLogin from "./pages/citizen/CitizenLogin";
import CitizenSignup from './pages/citizen/CitizenSignup';
import CitizenHome from './pages/citizen/CitizenHome';
import CitizenProfile from './pages/citizen/CitizenProfile';
import CitizenAbout from './pages/citizen/CitizenAbout';
import Events from './pages/citizen/Events';
import CivicBook from './pages/citizen/CivicBook';
import LeaderboardAndChallenges from './pages/citizen/LeaderboardAndChallenges';
import CivicFlow from './pages/citizen/civic-flow/CivicFlow';
import CitizenDashboard from './pages/citizen/civic-flow/CitizenDashboard';
import Report from './pages/citizen/civic-flow/Report';
import SchedulePickup from './pages/citizen/civic-flow/SchedulePickup';
import InstantGarbagePickup from './pages/citizen/civic-flow/InstantGarbagePickup';
import TrackReport from './pages/citizen/civic-flow/TrackReport';
import Reward from './pages/citizen/civic-flow/Reward';


// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import GeoSpatialPage from './pages/admin/GeoSpatialPage';
import LeaderboardPage from './pages/admin/LeaderboardPage';
import RiverHealthPage from './pages/admin/RiverHealthPage';
import HimalayanEcoPage from './pages/admin/HimalayanEcoPage';
import TourismImpactPage from './pages/admin/TourismImpactPage';
import RiskForecastingPage from './pages/admin/RiskForecastingPage';
import WorkforcePage from './pages/admin/WorkforcePage';
import ImpactPage from './pages/admin/ImpactPage';
import CommunityPage from './pages/admin/CommunityPage';
import CampaignsPage from './pages/admin/CampaignsPage';
import PolicyPage from './pages/admin/PolicyPage';
import CompliancePage from './pages/admin/CompliancePage';
import LiveVehicleTrack from './pages/admin/LiveVehicleTrack';

function App() {
  return (
    <>
      <Router>
        <Routes>

          {/* ------------------------------------------------------------- */}
          {/* CITIZEN ROUTES (Uses CitizenLayout: CitizenNavbar)            */}
          {/* ------------------------------------------------------------- */}
          <Route element={<CitizenLayout />}>
            <Route path="/CitizenAgreement" element={<CitizenAgreement />} />
            <Route path="/CitizenLogin" element={<CitizenLogin />} />
            <Route path="/CitizenSignup" element={<CitizenSignup />} />
            <Route path="/CitizenProfile" element={<CitizenProfile />} />
            <Route path="/CitizenHome" element={<CitizenHome />} />
            <Route path="/CitizenAbout" element={<CitizenAbout />} />
            <Route path="/Events" element={<Events />} />
            <Route path="/CivicBook" element={<CivicBook />} />
            <Route path="/LeaderboardAndCompetition" element={<LeaderboardAndChallenges />} />
          </Route>

          <Route element={<CivicFlowLayout />}>
            {/* CivicFlow System */}
            <Route path="/civicflow" element={<CivicFlow />} />
            <Route path="/CitizenDashboard" element={<CitizenDashboard />} />
            <Route path="/Report" element={<Report />} />
            <Route path="/SchedulePickup" element={<SchedulePickup />} />
            <Route path="/InstantGarbagePickup" element={<InstantGarbagePickup />} />
            <Route path="/TrackReport" element={<TrackReport />} />
            <Route path="/Reward" element={<Reward />} />
          </Route>
          


          {/* ------------------------------------------------------------- */}
          {/* ADMIN ROUTES (Uses AdminLayout: AdminNavbar)                  */}
          {/* ------------------------------------------------------------- */}
          <Route element={<AdminLayout />}>
            <Route path="/AdminLogin" element={<AdminLogin />} />
            <Route path="/AdminDashboard" element={<AdminDashboard />} />
            <Route path="/geo-spatial" element={<GeoSpatialPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/river-health" element={<RiverHealthPage />} />
            <Route path="/himalayan-eco" element={<HimalayanEcoPage />} />
            <Route path="/tourism-impact" element={<TourismImpactPage />} />
            <Route path="/risk-forecasting" element={<RiskForecastingPage />} />
            <Route path="/workforce" element={<WorkforcePage />} />
            <Route path="/Admin/live-vehicle-track" element={<LiveVehicleTrack />} />
            <Route path="/impact" element={<ImpactPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/campaigns" element={<CampaignsPage />} />
            <Route path="/policy" element={<PolicyPage />} />
            <Route path="/compliance" element={<CompliancePage />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;