import React from "react";

import Section from "react-bulma-components/lib/components/section";


import { useTopbarConfig } from "../../parts/Topbar";

import StudentList from "./parts/StudentList";
import { ModalProvider } from "components/Modal";
import EditStudentModal from "./parts/EditStudentModal"
import StudentListControls from "./parts/StudentListControls";

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