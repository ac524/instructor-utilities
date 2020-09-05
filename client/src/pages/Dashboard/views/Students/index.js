import React from "react";

import { Section } from "react-bulma-components";

import { useTopbarConfig } from "../../components/Topbar";

import StudentList from "./components/StudentList";
import { ModalProvider } from "components/Modal";
import EditStudentModal from "./components/EditStudentModal"
import StudentListControls from "./components/StudentListControls";

function Students() {

    useTopbarConfig({ name: "Students" });

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