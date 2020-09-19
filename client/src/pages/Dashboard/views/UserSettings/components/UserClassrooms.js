import React from "react";

import {
    Box,
    Heading,
    Button
} from "react-bulma-components";

import { useUserRoomsInfoByRole } from "utils/user";
import Icon from "components/Icon";
import Dropdown from "components/Dropdown";

const InstructorRoomsList = ( { rooms, ...props } ) => {

    if( !rooms.length ) return;

    return (
        <div {...props}>
            <Heading renderAs="h3" size={6} className="is-primary">Instructor Rooms</Heading>
            <div className="has-flex-rows is-bordered">
            {
                rooms.map( room => (
                    <p key={room._id} className="is-flex p-2" style={{alignItems:"center"}}>
                        <span>{room.name}</span>
                        <Dropdown label={<Icon icon="ellipsis-h" />} labelClassName="is-small" className="ml-auto is-right">
                            <Button size="small" className="dropdown-item">
                                <Icon icon="cog" />
                                <span>Manage</span>
                            </Button>
                            <Button size="small" className="dropdown-item">
                                <Icon icon="archive" />
                                <span>Archive</span>
                            </Button>
                        </Dropdown>
                    </p>
                ) )
            }
            </div>
        </div>
    )

}

const TaRoomsList = ( { rooms, ...props } ) => {

    return (
        <div  {...props}>
            <Heading renderAs="h3" size={6} className="is-primary">TA Rooms</Heading>
            <div className="has-flex-rows is-bordered">
            {
                rooms.map( room => (
                    <p key={room._id} className="is-flex p-2" style={{alignItems:"center"}}>
                        <span>{room.name}</span>
                        <Dropdown label={<Icon icon="ellipsis-h" />} labelClassName="is-small" className="ml-auto is-right">
                            <Button size="small" className="dropdown-item">
                                <Icon icon="sign-out-alt" />
                                <span>Leave</span>
                            </Button>
                        </Dropdown>
                    </p>
                ) )
            }
            </div>
        </div>
    );

}

const UserClassrooms = () => {

    const roomsByRole = useUserRoomsInfoByRole();

    return (
        <Box className="is-shadowless">
            <Heading renderAs="h2" size={4}>Classrooms</Heading>
            {roomsByRole.instructor && <InstructorRoomsList  className="mt-5" rooms={roomsByRole.instructor} />}
            {roomsByRole.ta && <TaRoomsList  className="mt-5" rooms={roomsByRole.ta} />}
        </Box>
    );

}

export default UserClassrooms;