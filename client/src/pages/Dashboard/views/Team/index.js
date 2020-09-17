import React from "react";

import { Section } from "react-bulma-components";

import { useTopbarConfig } from "pages/Dashboard/components/Topbar";
import Staff from "./components/Staff";
import StaffListControls from "./components/StaffListControls";

const Team = () => {

    useTopbarConfig({ name: "Team" });

    return (
        <Section>
            <StaffListControls />
            <Staff />
        </Section>
    );
    
}

export default Team;