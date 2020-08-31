import React, { useEffect } from "react";

import { useParams, Link } from "react-router-dom";
import socketIOClient from "socket.io-client";

import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome, faUsers, faUserGraduate, faPlusCircle, faPenSquare, faMinusSquare, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { faArrowAltCircleLeft, faTrashAlt } from '@fortawesome/free-regular-svg-icons';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import api from "utils/api";
import { useReadyStep } from "utils/ready";

import Toolbar from "./parts/Toolbar";
import Topbar from "./parts/Topbar";
import Views from "./parts/Views";

import { DashboardProvider, useDashboardContext, getDashboardAction as gda } from "./store";
import { SET_CLASSROOM } from "./store/actions";

import "./style.sass";

library.add( faHome, faArrowAltCircleLeft, faUsers, faUserGraduate, faPlusCircle, faPenSquare, faMinusSquare, faEllipsisH, faTrashAlt );

export const DashboardContainer = () => {

    const [ { classroom }, dispatch ] = useDashboardContext();
    const [ completeStep, uncompleteStep, isStepComplete ] = useReadyStep("getclassroom");
    const { roomId } = useParams();

    useEffect(() => {

        if( !roomId ) return;
        
        const loadClassroom = async () => {

            try {

                const { data } = await api.getClassroom( roomId );

                dispatch(gda(SET_CLASSROOM, data));

            } catch( err ) {

                dispatch(gda(SET_CLASSROOM, null));

            }

            completeStep();

        }

        /**
         * HACK FIX FOR DASHBOARD UNMOUNTING DURING LOGIN PROCESS AND CAUSE DISPATCH ON AN UNMOUNTED COMPONENT.
         * NEED TO FIND REAL ISSUE
         */
        // loadClassroom();
        const timeout = setTimeout( loadClassroom, 500 );

        return () => {
            uncompleteStep();
            clearTimeout(timeout)
        };
        
    }, [ roomId, dispatch, completeStep, uncompleteStep ]);

    const content = isStepComplete

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
    )
}

function Dashboard() {

    useEffect(() => {

        const socket = socketIOClient("http://localhost:3000");

        console.log( socket );

        socket.on("FromAPI", data => {

            console.log(data);

        });

        return () => socket.disconnect();

    });

    return (
        <DashboardProvider>
            <DashboardContainer />
        </DashboardProvider>
    );
}

export default Dashboard;