import React from "react";

import {
    Section,
    Tile,
    Heading,
    Content,
    Button
} from "react-bulma-components";

import Widget from "./components/Widget";

import { useTopbarConfig } from "../../components/Topbar";
import { useClassroom } from "pages/Dashboard/store";
import { useAuthorizedUser } from "utils/auth";
import RoomLink from "pages/Dashboard/components/RoomLink";
import Dropdown from "components/Dropdown";
import { useManageApps } from "pages/Dashboard/utils/apps";
import Icon from "../../../../components/Icon";

function Classroom() {

    const dropdownLabel = <span className="is-flex"><Icon icon="plus-circle" className="mr-1" /> Classroom Tool</span>;
    const topbarTools = (
        <Dropdown label={dropdownLabel} labelSize="small">
            <Button className="dropdown-item" size="small">
                <Icon icons="pen-square" />
                <span>Edit Student</span>
            </Button>
            <Button className="dropdown-item" size="small">
                <Icon icons={["far","trash-alt"]} />
                <span>Remove Student</span>
            </Button>
        </Dropdown>
    );

    useTopbarConfig({ name: "Classroom", tools: topbarTools });

    const user = useAuthorizedUser();
    const { apps } = useClassroom();
    const manageApps = useManageApps();

    return (
        <Section className="is-flex" style={{flexGrow:1,flexDirection:"column"}}>
            {
                apps.length

                ? (
                    <Tile kind="ancestor">
                        <Tile kind="parent">
                            <Tile kind="child" renderAs={Widget} size={6} />
                        </Tile>
                    </Tile>
                )

                : (
                    <div className="has-text-centered is-flex" style={{flexGrow:1,alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
                        <Heading size={4}>Welcome, to your classroom {user.name}</Heading>
                        <Content>
                            <p>
                                To get started with your classroom Dashboard
                                <br /><br />
                                <Button color="primary" onClick={() => manageApps(true)}>Start exploring tools</Button>
                            </p>
                            <hr />
                            <p className="is-size-7">
                                Not ready to explore tools yet?<br />
                                Start <RoomLink to="/team">inviting staff</RoomLink>, or <RoomLink to="/students">registering students</RoomLink>.
                            </p>
                        </Content>
                    </div>
                )
            }
        </Section>
    )
}

export default Classroom;