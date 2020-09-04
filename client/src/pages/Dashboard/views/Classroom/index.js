import React from "react";

import Section from "react-bulma-components/lib/components/section";

import Tile from "react-bulma-components/lib/components/tile";
import Heading from "react-bulma-components/lib/components/heading";
import Content from "react-bulma-components/lib/components/content";
import Button from "react-bulma-components/lib/components/button";

import Widget from "./parts/Widget";

import { useTopbarConfig } from "../../parts/Topbar";
import { useClassroom } from "pages/Dashboard/store";
import { useAuthorizedUser } from "utils/auth";
import RoomLink from "pages/Dashboard/parts/RoomLink";

function Classroom() {

    useTopbarConfig({ name: "Classroom" });

    const user = useAuthorizedUser();
    const { tools } = useClassroom();

    return (
        tools.length
            ? (
                <Section>
                    <Tile kind="ancestor">
                        <Tile kind="parent">
                            <Tile kind="child" renderAs={Widget} size={6} />
                        </Tile>
                    </Tile>
                </Section>
            )

            : (
                <Section className="has-text-centered is-flex" style={{flexGrow:1,alignItems:"center",justifyContent:"center"}}>
                    <div>
                        <Heading size={4}>Welcome, to your classroom {user.name}</Heading>
                        <Content>
                            <p>
                                To get started with your classroom Dashboard
                                <br /><br />
                                <Button color="primary">Start exploring tools</Button>
                            </p>
                            <hr />
                            <p className="is-size-7">
                                Not ready to explore tools yet?<br />
                                Start <RoomLink to="/team">inviting staff</RoomLink>, or <RoomLink to="/students">registering students</RoomLink>.
                            </p>
                        </Content>
                    </div>
                </Section>
            )
    )
}

export default Classroom;