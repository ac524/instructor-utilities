import React, { useState } from "react";

import { Section } from "react-bulma-components";

import { useTopbarConfig } from "pages/Dashboard/components/Topbar";

import StudentList from "./components/StudentList";
import StudentModal from "../../components/StudentModal"
import StudentListControls from "./components/StudentListControls";

const Students = () => {

    const [ sort, setSort ] = useState("name:asc");
    const [ groupBy, setGroupBy ] = useState("none");
    const [ search, setSearch ] = useState("");
    const [ assignment, setAssignment ] = useState("");
    useTopbarConfig({ name: "Students" });

    return (
        <Section>
            <StudentListControls sort={[ sort, setSort ]} groupBy={[ groupBy, setGroupBy ]} search={[ search, setSearch ]} assignment={[ assignment, setAssignment ]}/>
            <StudentList sort={sort} groupBy={groupBy} search={search.toLowerCase()} />
            <StudentModal />
        </Section>
    );

}

export default Students;