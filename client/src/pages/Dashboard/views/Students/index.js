import React, { useState } from "react";

import { Section } from "react-bulma-components";

import { useTopbarConfig } from "../../components/Topbar";

import StudentList from "./components/StudentList";
import { ModalProvider } from "../../../../components/Modal";
import EditStudentModal from "./components/EditStudentModal"
import StudentListControls from "./components/StudentListControls";

function Students() {

    const [ sort, setSort ] = useState("name:asc");
    const [ groupBy, setGroupBy ] = useState("none");
    useTopbarConfig({ name: "Students" });

    return (
        <Section>
            <ModalProvider>
                <StudentListControls sort={[ sort, setSort ]} groupBy={[ groupBy, setGroupBy ]}/>
                <StudentList sort={sort} groupBy={groupBy} />
                <EditStudentModal />
            </ModalProvider>
        </Section>
    );

}

export default Students;