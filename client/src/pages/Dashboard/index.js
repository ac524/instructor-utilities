import React from "react";
import Toolbar from "./parts/Toolbar";
import Views from "./parts/Views";

import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome, faUsers, faUserGraduate, faPlusCircle, faPenSquare, faMinusSquare } from '@fortawesome/free-solid-svg-icons';
import { faArrowAltCircleLeft } from '@fortawesome/free-regular-svg-icons';
import Topbar from "./parts/Topbar";
import { DashboardProvider } from "./store";

import "./style.sass";

library.add( faHome, faArrowAltCircleLeft, faUsers, faUserGraduate, faPlusCircle, faPenSquare, faMinusSquare );

function Dashboard() {
    return (
        <DashboardProvider>
            <Toolbar />
            <div className="dashboard-panel has-background-white-bis">
                <Topbar/>
                <Views />
            </div>
        </DashboardProvider>
    );
}

export default Dashboard;