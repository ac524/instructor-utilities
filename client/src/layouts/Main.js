import React from "react";
import TopNavbar from "./components/TopNavbar"
import Footer from "./components/Footer";

function Main({ children }) {
    return (
        <div>
            <TopNavbar />
            {children}
            <Footer />
        </div>
    )
}

export default Main;