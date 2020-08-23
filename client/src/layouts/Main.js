import React from "react";
import TopNavbar from "./parts/TopNavbar"

function Main({ children }) {
    return (
        <div>
            <TopNavbar />
            {children}
        </div>
    )
}

export default Main;