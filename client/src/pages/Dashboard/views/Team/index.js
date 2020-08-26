import React from "react";

import Section from "react-bulma-components/lib/components/section";
import { useTopbarConfig } from "../../parts/Topbar";
import Staff from "./parts/Staff";

function Team() {

    useTopbarConfig({ name: "Team" });

    return (
        <Section>
            <Staff />
        </Section>
    );
}

export default Team;