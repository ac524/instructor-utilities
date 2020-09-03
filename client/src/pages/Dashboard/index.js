import React from "react";

import { useParams, Link } from "react-router-dom";

import dashboardIconsLoader from "./utils/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import Button from "react-bulma-components/lib/components/button";

import Toolbar from "./parts/Toolbar";
import Topbar from "./parts/Topbar";
import Views from "./parts/Views";

import { DashboardProvider, useClassroomLoader, useClassroom } from "./store";
import { useRoomSocketDispatch } from "./utils/socket.io";

import "./style.sass";

dashboardIconsLoader();

export const DashboardContainer = () => {

    const { roomId } = useParams();
    const classroom = useClassroom();

    const isRoomLoaded = useClassroomLoader( roomId );

    // Live dispatch listener for shared updates.
    useRoomSocketDispatch( roomId );

    const content = isRoomLoaded

        ? (
            classroom

                ? (
                    <div className="dashboard-panel has-background-white-bis">
                        <Topbar/>
                        <Views />
                    </div>
                )

                : (
                    <div className="dashboard-panel has-background-white-bis is-flex" style={{alignItems:"center",justifyContent:"center", flexDirection:"column"}}>
                        <span className="is-size-3">Classroom Not Found</span>
                        <Link to="/">
                            <FontAwesomeIcon className="mr-1" icon={['far','arrow-alt-circle-left']} />
                            Back to class
                        </Link>
                    </div>
                )
        )

        : null;

    return (
        <div className="dashboard-container">
            <Toolbar />
            {content}
        </div>
    );

}

function Dashboard() {

    return (
        <DashboardProvider>
            <DashboardContainer />
        </DashboardProvider>
    );

}

export default Dashboard;