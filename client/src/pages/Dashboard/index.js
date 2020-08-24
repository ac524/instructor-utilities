import React from "react";
import Toolbar from "./parts/Toolbar";
import Views from "./parts/Views";
import { Route } from "react-router-dom";

function Dashboard(props) {
    return (
        <div>
            <Toolbar />
            <Views />
        </div>
    );
}

export default Dashboard;