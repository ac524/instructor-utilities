import React from "react";

import Section from "react-bulma-components/lib/components/section";

import Tile from "react-bulma-components/lib/components/tile";

import Widget from "./parts/Widget";

import { useTopbarConfig } from "../../parts/Topbar";

function Classroom() {

    useTopbarConfig({ name: "Classroom" });

    return (
        <Section>
            <Tile kind="ancestor">
                <Tile kind="parent">
                    <Tile kind="child" renderAs={Widget} size={6} />
                </Tile>
            </Tile>
        </Section>
    )
}

export default Classroom;