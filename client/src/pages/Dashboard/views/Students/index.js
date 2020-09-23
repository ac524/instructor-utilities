import React, { useState } from "react";

import { Section } from "react-bulma-components";

import { useTopbarConfig } from "pages/Dashboard/components/Topbar";

import StudentList from "./components/StudentList";
import { ModalProvider } from "components/Modal";
import StudentModal from "../../components/StudentModal"
import StudentListControls from "./components/StudentListControls";

const Students = () => {

    const [ sort, setSort ] = useState("name:asc");
    const [ groupBy, setGroupBy ] = useState("none");
    const [ search, setSearch ] = useState("");
    useTopbarConfig({ name: "Students" });

    return (
        <Section>
            <ModalProvider>
                <StudentListControls sort={[ sort, setSort ]} groupBy={[ groupBy, setGroupBy ]} search={[ search, setSearch ]} />
                <StudentList sort={sort} groupBy={groupBy} search={search.toLowerCase()} />
                <StudentModal />
            </ModalProvider>
        </Section>
    );

}

export default Students;