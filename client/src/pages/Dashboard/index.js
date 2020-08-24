import React from "react";
import Toolbar from "./parts/Toolbar";
import Views from "./parts/Views";

import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome, faUsers, faUserGraduate } from '@fortawesome/free-solid-svg-icons';
import { faArrowAltCircleLeft } from '@fortawesome/free-regular-svg-icons';

library.add( faHome, faArrowAltCircleLeft, faUsers, faUserGraduate );


function Dashboard() {
    return (
        <div>
            <Toolbar />
            <Views />
        </div>
    );
}

export default Dashboard;