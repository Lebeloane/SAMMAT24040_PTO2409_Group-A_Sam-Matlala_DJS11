import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

/**
 *
 * @returns {JSX.Element}
 * Layout Component
 *
 * This component serves as a layout for the application, containing the Navbar, Footer, and the main content area.
 * The Outlet component is used to render the child routes defined in the App component.
 */
const Layout = () => {
  return (
    <>
        <Navbar />
        <main className="container mx-auto px-4 py-8">
            <Outlet />
        </main>
        <Footer />
    </>
  );
}

export default Layout;
