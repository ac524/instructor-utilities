import React from "react";

import { Section } from "react-bulma-components";

import { useTopbarConfig } from "../../components/Topbar";
import Staff from "./components/Staff";
import StaffListControls from "./components/StaffListControls";

function Team() {

    useTopbarConfig({ name: "Team" });

    return (
        <Section>
            <StaffListControls />
            <Staff />
        </Section>
    );
    
}

export default Team;