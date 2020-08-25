import React from "react";

import Section from "react-bulma-components/lib/components/section";
import { useTopbarConfig } from "../parts/Topbar";

function Students() {

    useTopbarConfig({ name: "Students" });

    return (
        <Section>
            Content coming...
        </Section>
    );

}

export default Students;