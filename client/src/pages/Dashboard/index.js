import React from "react";
import Toolbar from "./parts/Toolbar";
import Views from "./parts/Views";

import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome, faUsers, faUserGraduate, faPlusCircle, faPenSquare } from '@fortawesome/free-solid-svg-icons';
import { faArrowAltCircleLeft } from '@fortawesome/free-regular-svg-icons';
import Topbar from "./parts/Topbar";
import { DashboardProvider } from "./store";

library.add( faHome, faArrowAltCircleLeft, faUsers, faUserGraduate, faPlusCircle, faPenSquare );

function Dashboard() {
    return (
        <DashboardProvider>
            <Toolbar />
            <Topbar/>
            <Views />
        </DashboardProvider>
    );
}

export default Dashboard;