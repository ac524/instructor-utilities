import React from "react";

import Section from "react-bulma-components/lib/components/section";

import { useTopbarConfig } from "../../parts/Topbar";

function Classroom() {

    useTopbarConfig({ name: "Classroom" });

    return (
        <Section>
            Content coming...
        </Section>
    )
}

export default Classroom;