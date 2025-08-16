import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export function AppLayout() {

    return <>
        <Navbar />
        <Outlet />
        <Footer />
    </>
}