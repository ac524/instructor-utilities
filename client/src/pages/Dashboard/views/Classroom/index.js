import React, { useEffect, useState } from "react";

import {
    Section,
    Tile,
    Heading,
    Content,
    Button
} from "react-bulma-components";

import Widget from "./components/Widget";

import { useTopbarConfig } from "../../components/Topbar";
import Dropdown from "components/Dropdown";
import Icon from "components/Icon";
import RoomLink from "../../components/RoomLink";
import { useClassroom } from "../../store";
import { useAuthorizedUser } from "utils/auth";
import { useUserRoomsInfo } from "utils/user";
import { Link } from "react-router-dom";
import { useDashboardDispatch, getDashboardAction as gda } from "../../store"
import { SET_MANAGE_APPS } from "../../store/actionsNames";

const Classroom = () => {

    const dispatch = useDashboardDispatch();
    const user = useAuthorizedUser();
    const { _id: roomId, name: roomName, apps } = useClassroom();

    const roomnames = useUserRoomsInfo();
    const [ topbarTools, setTopbarTools ] = useState();

    useEffect(() => {

        const tools = [];
        const manageApps = ( state ) => dispatch( gda( SET_MANAGE_APPS, state ) );
    
        if( roomnames.length > 1 ) {
            tools.push((
                <Dropdown key="rooms" label={<Icon icon="chevron-circle-down" />} labelSize="small" className="is-right">
                    {
                        roomnames.map(room => (
                            <Button renderAs={Link} to={`/${room._id}`} className={"dropdown-item" + (roomId === room._id ? " is-active" : "")} size="small" key={room._id}>
                                {room.name}
                            </Button>
                        ))
                    }
                </Dropdown>
            ))
        }
    
        tools.push((
            <Dropdown key="apps" label={<Icon icon="ellipsis-h" />} labelSize="small" className="ml-auto mr-3 is-right">
                <Button className="dropdown-item" size="small" onClick={() => manageApps(true)}>
                    <Icon icon="download" />
                    <span>Manage Apps</span>
                </Button>
            </Dropdown>
        ));

        setTopbarTools(tools);

    }, [roomId, roomnames, dispatch, setTopbarTools]);


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
                                <Button color="primary" onClick={() => dispatch( gda( SET_MANAGE_APPS, true ) )}>Start exploring tools</Button>
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