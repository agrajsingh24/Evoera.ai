import { Outlet } from "react-router-dom";
import CivicFlowNavbar from "../components/citizen/civic-flow/CivicFlowNavbar";
import CitizenFooter from "../components/citizen/CitizenFooter";

export default function CivicFlowLayout() {
    return (
        <div className="flex flex-col min-h-screen bg-[#020617]">
            <CivicFlowNavbar />

            <main className="flex-grow flex flex-col">
                <Outlet />
            </main>

            <CitizenFooter />
        </div>
    );
}