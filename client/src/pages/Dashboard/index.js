import React from "react";

import { useParams, Link } from "react-router-dom";

import loadDashboardIcons from "./utils/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import Button from "react-bulma-components/lib/components/button";

import Toolbar from "./components/Toolbar";
import Topbar from "./components/Topbar";
import Views from "./components/Views";

import { DashboardProvider, useClassroomLoader, useClassroom } from "./store";
import { useRoomSocketDispatch } from "./utils/socket.io";

import "./style.sass";

loadDashboardIcons();

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