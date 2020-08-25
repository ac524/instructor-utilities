import React, { useEffect } from "react";

import api from "../../../../utils/api";
import { useReadyStep } from "../../../../utils/ready";
import Section from "react-bulma-components/lib/components/section";
import { useTopbarConfig } from "../../parts/Topbar";
import { useDashboardContext, getDashboardAction as gda } from "../../store";
import { SET_STUDENTS } from "../../store/actions";
import StudentList from "./parts/StudentList";
import { ModalProvider } from "components/Modal";
import EditStudentModal from "./parts/EditStudentModal"
import StudentListControls from "./parts/StudentListControls";

function Students() {

    useTopbarConfig({ name: "Students" });

    const [ completeStep ] = useReadyStep("GetStudents");

    const [ ,dispatch ] = useDashboardContext();

    useEffect( () => {

        api.getStudents().then((res) => {

            dispatch( gda( SET_STUDENTS, res.data ) );

            completeStep();
            
        });

    }, [ completeStep, dispatch ] );

    return (
        <Section>
            <ModalProvider>
                <StudentListControls />
                <StudentList />
                <EditStudentModal />
            </ModalProvider>
        </Section>
    );

}

export default Students;