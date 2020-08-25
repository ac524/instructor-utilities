import React from "react";

import Section from "react-bulma-components/lib/components/section";
import { useTopbarConfig } from "../parts/Topbar";

function Team() {

    useTopbarConfig({ name: "Team" });

    return (
        <Section>
            Content to be built...
        </Section>
    );
}

export default Team;