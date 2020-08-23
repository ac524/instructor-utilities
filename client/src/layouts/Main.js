import React from "react";
import TopNavbar from "./parts/TopNavbar"
import Footer from "./parts/Footer";

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