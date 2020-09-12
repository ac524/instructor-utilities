import React, { useEffect } from "react";

import { useParams, Link } from "react-router-dom";

import loadDashboardIcons from "./utils/icons";

// import { Button } from "react-bulma-components";

import Toolbar from "./components/Toolbar";
import Topbar from "./components/Topbar";
import Views from "./components/Views";
import ManageApps from "./components/ManageApps";

import { DashboardProvider, useClassroomLoader, useClassroom, useDashboardDispatch } from "./store";

import "./style.sass";
import Icon from "../../components/Icon";
import { useIsUserVerified } from "../../utils/auth";
import { useSocket } from "../../utils/socket.io";
import PendingVerification from "./components/PendingVerification";

loadDashboardIcons();

export const DashboardContainer = () => {

    const dispatch = useDashboardDispatch();

    const { roomId } = useParams();
    const isRoomLoaded = useClassroomLoader( roomId );
    const classroom = useClassroom();
    const socket = useSocket();

    useEffect(() => {

        if( socket )

            socket.on("dispatch", data => dispatch(data));

    }, [socket, dispatch]);

    const content = isRoomLoaded

        ? (
            classroom

                ? (
                    <div className="dashboard-panel has-background-white-bis">
                        <Topbar/>
                        <Views />
                        <ManageApps />
                    </div>
                )

                : (
                    <div className="dashboard-panel has-background-white-bis is-flex" style={{alignItems:"center",justifyContent:"center", flexDirection:"column"}}>
                        <span className="is-size-3">Classroom Not Found</span>
                        <Link to="/" className="is-flex">
                            <Icon className="mr-1" icon={['far','arrow-alt-circle-left']} />
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
    
    const isUserVerified = useIsUserVerified();

    return (
        <DashboardProvider>
            {
                isUserVerified
                    ? <DashboardContainer />
                    : <PendingVerification />
            }
        </DashboardProvider>
    );

}

export default Dashboard;