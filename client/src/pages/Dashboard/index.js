import { useEffect } from "react";

import { useParams, Link, Switch, Route } from "react-router-dom";

import loadDashboardIcons from "./utils/icons";

// import { Button } from "react-bulma-components";

import Toolbar from "./components/Toolbar";
import Topbar from "./components/Topbar";
import Views from "./components/Views";
import ManageApps from "./components/ManageApps";

import { DashboardProvider, useClassroomLoader, useClassroom, useDashboardDispatch } from "./store";

import "./style.sass";
import Icon from "components/Icon";
import { useIsUserVerified } from "utils/auth";
import { useSocket } from "utils/socket.io";
import PendingVerification from "./components/PendingVerification";
import Fade from "animations/Fade";
import UserSettings from "./views/UserSettings";
import { Modal } from "components/Modal";

loadDashboardIcons();

export const DashboardContainer = () => {

    const dispatch = useDashboardDispatch();

    const { roomId } = useParams();
    const isRoomLoaded = useClassroomLoader( roomId );
    const classroom = useClassroom();
    const socket = useSocket();

    useEffect(() => {
        
        if( !socket ) return;

        socket.emit( "join:room", roomId );

        const dispatchData = ( message ) => dispatch( message );

        socket.on("room:dispatch", dispatchData);

        return () => {

            socket.emit( "leave:room", roomId );
            socket.off("room:dispatch", dispatchData);

        }

    }, [roomId, socket, dispatch]);
    
    return isRoomLoaded

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

}

const Dashboard = () => {
    
    const isUserVerified = useIsUserVerified();

    return (
        <DashboardProvider>
            <div className="dashboard-container">
                <Toolbar />
                <Switch>
                    <Route path="/settings">
                        <div className="dashboard-panel has-background-white-bis">
                            <Topbar />
                            <UserSettings />
                        </div>
                    </Route>
                    <Route>
                        <Fade show={isUserVerified}><DashboardContainer /></Fade>
                    </Route>
                </Switch>
            </div>
            <Fade show={!isUserVerified}><PendingVerification /></Fade>
            <Modal namespace="dashboard" />
        </DashboardProvider>
    );

}

export default Dashboard;