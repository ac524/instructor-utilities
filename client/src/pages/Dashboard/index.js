import React, { useEffect } from "react";

import { useParams, Link } from "react-router-dom";

import {
    Heading,
    Container,
    Content,
    Button
} from "react-bulma-components";

import loadDashboardIcons from "./utils/icons";

// import { Button } from "react-bulma-components";

import Toolbar from "./components/Toolbar";
import Topbar from "./components/Topbar";
import Views from "./components/Views";
import ManageApps from "./components/ManageApps";

import { DashboardProvider, useClassroomLoader, useClassroom, useDashboardDispatch } from "./store";

import "./style.sass";
import Icon from "../../components/Icon";
import { useAuthorizedUser, useIsUserVerified } from "../../utils/auth";
import { useSocket } from "../../utils/socket.io";

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
    
    const user = useAuthorizedUser();
    const isUserVerified = useIsUserVerified();

    return (
        <DashboardProvider>
            {
                isUserVerified
                    ? <DashboardContainer />
                    : (
                        <div className="is-overlay has-background-primary has-text-white is-flex" style={{ opacity: .9, alignItems: "center", zIndex: 100, position: "fixed" }}>
                            <Container>
                                <Heading renderAs="p" className="has-text-inherit is-flex" size={1} style={{alignItems:"center"}}>
                                    <img src="/images/logo-white.png" style={{width: "60px", height: "auto"}} alt="Classroom Logo" />
                                    <span>Classroom</span>
                                </Heading>
                                <p className="is-size-6">Hi, {user.name}</p>
                                <Heading className="has-text-inherit">Email Validation Required</Heading>
                                <Heading className="has-text-inherit" renderAs="p" subtitle>We sent you an email. Please click the provided link to verify your email.</Heading>
                                <Content>
                                    <p className="is-size-7">Didn't get an email?</p>
                                    <Button color="light" outlined>
                                        <Icon icon="paper-plane" />
                                        <span>Resend Verification Link</span>
                                    </Button>
                                </Content>
                            </Container>
                        </div>
                    )
            }
        </DashboardProvider>
    );

}

export default Dashboard;