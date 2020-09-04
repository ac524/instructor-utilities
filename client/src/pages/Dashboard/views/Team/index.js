import React from "react";

import Section from "react-bulma-components/lib/components/section";
import { useTopbarConfig } from "../../components/Topbar";
import Staff from "./components/Staff";

function Team() {

    useTopbarConfig({ name: "Team" });

    return (
        <Section>
            <Staff />
        </Section>
    );
}

export default Team;