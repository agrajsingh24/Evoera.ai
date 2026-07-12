import { Outlet, useLocation } from "react-router-dom";
import CitizenNavbar from "../components/citizen/CitizenNavbar";
import CitizenFooter from "../components/citizen/CitizenFooter"; // Or MainFooter if you reused it

export default function CitizenLayout() {
    // 1. Get the current URL path
    const location = useLocation();

    // 2. List the exact paths where the Citizen Navbar should be hidden
    const hideNavbarRoutes = ["/CitizenLogin","/CitizenSignup", "/CitizenAgreement"];

    // 3. Check if we are currently on one of those pages
    const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

    return (
        <div className="min-h-screen bg-[#020617]">

            {/* 4. Conditionally render the Navbar */}
            {!shouldHideNavbar && <CitizenNavbar />}

            <main className="flex-grow flex flex-col">
                <Outlet />
            </main>

            {/* Optional: You can apply the exact same logic to the footer if you want to hide it too! */}
            <CitizenFooter />
        </div>
    );
}