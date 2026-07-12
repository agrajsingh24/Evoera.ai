import { Outlet, useLocation } from "react-router-dom";
import WorkerNavbar from "../components/worker/WorkerNavbar";
import MainFooter from "../components/common/MainFooter";

export default function WorkerLayout() {
    // useLocation gives us the current URL path (e.g., "/WorkerLogin")
    const location = useLocation();

    // Define the exact paths where you DO NOT want the navbar to show up
    const hideNavbarRoutes = ["/WorkerLogin", "/WorkerSignup", "/WorkerAgreement"];

    // Check if our current URL is in that list
    const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

    return (
        <div className="flex flex-col min-h-screen bg-black">

            {/* conditionally render the Navbar: ONLY show it if shouldHideNavbar is false */}
            {!shouldHideNavbar && <WorkerNavbar />}

            <main className="flex-grow flex flex-col">
                <Outlet />
            </main>

            <MainFooter />
        </div>
    );
}