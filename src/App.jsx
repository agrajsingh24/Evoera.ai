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
import CitizenHome from './pages/citizen/CitizenHome';
import CitizenAbout from './pages/citizen/CitizenAbout';
import CivicFlow from './pages/citizen/civic-flow/CivicFlow';
import CitizenDashboard from './pages/citizen/civic-flow/CitizenDashboard';
import Report from './pages/citizen/civic-flow/Report';
import Reward from './pages/citizen/civic-flow/Reward';


// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";

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
            <Route path="/CitizenHome" element={<CitizenHome />} />
            <Route path="/CitizenAbout" element={<CitizenAbout />} />
          </Route>

          <Route element={<CivicFlowLayout />}>
            {/* CivicFlow System */}
            <Route path="/civicflow" element={<CivicFlow />} />
            <Route path="/CitizenDashboard" element={<CitizenDashboard />} />
            <Route path="/Report" element={<Report />} />
            <Route path="/Reward" element={<Reward />} />
          </Route>
          


          {/* ------------------------------------------------------------- */}
          {/* ADMIN ROUTES (Uses AdminLayout: AdminNavbar)                  */}
          {/* ------------------------------------------------------------- */}
          <Route element={<AdminLayout />}>
            <Route path="/AdminLogin" element={<AdminLogin />} />
            <Route path="/AdminDashboard" element={<AdminDashboard />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;