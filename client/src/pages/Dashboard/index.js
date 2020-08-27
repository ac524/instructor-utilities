import React, { useEffect } from "react";
import Toolbar from "./parts/Toolbar";
import Views from "./parts/Views";

import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome, faUsers, faUserGraduate, faPlusCircle, faPenSquare, faMinusSquare, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { faArrowAltCircleLeft, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import Topbar from "./parts/Topbar";
import { DashboardProvider, useDashboardContext, getDashboardAction as gda } from "./store";

import "./style.sass";
import api from "utils/api";
import { SET_CLASSROOM } from "./store/actions";
import { useReadyStep } from "utils/ready";

library.add( faHome, faArrowAltCircleLeft, faUsers, faUserGraduate, faPlusCircle, faPenSquare, faMinusSquare, faEllipsisH, faTrashAlt );

export const DashboardContainer = () => {

    const [ ,dispatch ] = useDashboardContext();
    const [ completeStep ] = useReadyStep("getclassroom");

    useEffect(() => {

        const loadClassroom = async () => {

            const { data } = await api.getClassroom();

            dispatch(gda(SET_CLASSROOM, data));

            completeStep();

        }

        loadClassroom();
        
    }, [ dispatch, completeStep ]);

    return (
        <div className="dashboard-container">
            <Toolbar />
            <div className="dashboard-panel has-background-white-bis">
                <Topbar/>
                <Views />
            </div>
        </div>
    )
}

function Dashboard() {
    return (
        <DashboardProvider>
            <DashboardContainer />
        </DashboardProvider>
    );
}

export default Dashboard;