import { Outlet } from "react-router-dom";
// Note: Adjust these import paths if you kept the original names (like "../components/Navbar")
import MainNavbar from "../components/home/MainNavbar";
import MainFooter from "../components/common/MainFooter";

export default function MainLayout() {
    return (
        <div className="flex flex-col min-h-screen">
            <MainNavbar />

            {/* flex-grow pushes the footer to the bottom */}
            <main className="flex-grow">
                <Outlet />
            </main>

            <MainFooter />
        </div>
    );
}