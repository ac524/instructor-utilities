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
import Dropdown from "../../../../components/Dropdown";
import Icon from "../../../../components/Icon";
import { useManageApps } from "../../utils/apps";
import RoomLink from "../../components/RoomLink";
import { useClassroom } from "../../store";
import { useAuthorizedUser } from "../../../../utils/auth";

const Classroom = () => {

    const manageApps = useManageApps();

    const topbarTools = [
        (
            <Dropdown key="rooms" label={<Icon icon="chevron-circle-down" />} labelSize="small" className="is-right">
                {
                    [ "Room 1", "Room 2" ].map(room => (
                        <Button className="dropdown-item" size="small">
                            {room}
                        </Button>
                    ))
                }
            </Dropdown>
        ),
        (
            <Dropdown key="apps" label={<Icon icon="ellipsis-h" />} labelSize="small" className="ml-auto mr-3 is-right">
                <Button className="dropdown-item" size="small" onClick={() => manageApps(true)}>
                    <Icon icon="download" />
                    <span>Manage Apps</span>
                </Button>
            </Dropdown>
        )
    ];  

    const user = useAuthorizedUser();
    const { _id: roomId, name: roomName, apps } = useClassroom();

    useTopbarConfig({ name: roomName, tools: topbarTools });


    return (
        <Section className="is-flex" style={{flexGrow:(apps.length ? 0 : 1),flexDirection:"column"}}>
            {
                apps.length

                ? (
                    <Tile kind="ancestor">
                        <Tile kind="parent">
                            { apps.map( appTypeId => (
                                <Tile
                                    key={appTypeId}
                                    kind="child"
                                    renderAs={Widget}
                                    size={6}
                                    roomId={roomId}
                                    appTypeId={appTypeId}
                                />
                            ) ) }
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