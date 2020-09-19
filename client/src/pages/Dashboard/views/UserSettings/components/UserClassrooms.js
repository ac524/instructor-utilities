import React from "react";

import {
    Box,
    Heading,
    Button
} from "react-bulma-components";

import { useUserRoomsInfoByRole } from "utils/user";
import Icon from "components/Icon";
import Dropdown from "components/Dropdown";
import api from "utils/api";
import { useAuthorizedUser } from "utils/auth";
import { useStoreDispatch, getStoreAction as gsa } from "store";
import { REMOVE_USER_ROOM_ID, UPDATE_USER } from "store/actions";

const InstructorRoomsList = ( { rooms, ...props } ) => {

    const dispatch = useStoreDispatch();

    if( !rooms.length ) return;

    const handleArchiveRoom = async roomId => {

        try {

            await api.userArchiveRoom( roomId );
            dispatch(gsa( REMOVE_USER_ROOM_ID, roomId ));

        } catch(err) {

            console.log(err);

        }

    }

    return (
        <div {...props}>
            <Heading renderAs="h3" size={6} className="is-primary">Instructor Rooms</Heading>
            <div className="has-flex-rows is-bordered">
            {
                rooms.map( room => (
                    <div key={room._id} className="is-flex p-2" style={{alignItems:"center"}}>
                        <span>{room.name}</span>
                        <Dropdown label={<Icon icon="ellipsis-h" />} labelClassName="is-small" className="ml-auto is-right">
                            <Button size="small" className="dropdown-item">
                                <Icon icon="cog" />
                                <span>Manage</span>
                            </Button>
                            <Button size="small" className="dropdown-item" onClick={()=>handleArchiveRoom(room._id)}>
                                <Icon icon="archive" />
                                <span>Archive</span>
                            </Button>
                        </Dropdown>
                    </div>
                ) )
            }
            </div>
        </div>
    )

}

const TaRoomsList = ( { rooms, ...props } ) => {

    const dispatch = useStoreDispatch();

    const handleLeaveRoom = async roomId => {

        try {

            await api.userLeaveRoom( roomId );
            dispatch(gsa( REMOVE_USER_ROOM_ID, roomId ));

        } catch(err) {

            console.log(err);

        }

    }

    return (
        <div  {...props}>
            <Heading renderAs="h3" size={6} className="is-primary">TA Rooms</Heading>
            <div className="has-flex-rows is-bordered">
            {
                rooms.map( room => (
                    <div key={room._id} className="is-flex p-2" style={{alignItems:"center"}}>
                        <span>{room.name}</span>
                        <Dropdown label={<Icon icon="ellipsis-h" />} labelClassName="is-small" className="ml-auto is-right">
                            <Button size="small" className="dropdown-item" onClick={()=>handleLeaveRoom(room._id)}>
                                <Icon icon="sign-out-alt" />
                                <span>Leave</span>
                            </Button>
                        </Dropdown>
                    </div>
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