import React, { useEffect } from "react";

import { useParams, Link } from "react-router-dom";

import loadDashboardIcons from "./utils/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import Button from "react-bulma-components/lib/components/button";

import Toolbar from "./components/Toolbar";
import Topbar from "./components/Topbar";
import Views from "./components/Views";
import ManageApps from "./components/ManageApps";

import { DashboardProvider, useClassroomLoader, useClassroom, useDashboardDispatch } from "./store";
import { RoomSocketProvider, useRoomSocket } from "./utils/socket.io";

import "./style.sass";

loadDashboardIcons();

export const DashboardContainer = () => {

    const dispatch = useDashboardDispatch();

    const { roomId } = useParams();
    const isRoomLoaded = useClassroomLoader( roomId );
    const classroom = useClassroom();

    const socket = useRoomSocket();

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

    const { roomId } = useParams();

    return (
        <DashboardProvider>
            <RoomSocketProvider roomId={roomId}>
                <DashboardContainer />
            </RoomSocketProvider>
        </DashboardProvider>
    );

}

export default Dashboard;