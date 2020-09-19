import { useEffect, useState } from "react"
import api from "./api";
import { useAuthorizedUser, useIsAuthenticated } from "./auth";

export const useUserRoomsInfo = () => {

    const [ rooms, setRooms ] = useState([]);
    const user = useAuthorizedUser();

    useEffect(() => {

        if( !user.classrooms.length ) {
            setRooms([])
            return;
        }

        const getRoomnames = async () => setRooms( ( await api.userRoomnames() ).data );

        try {

            getRoomnames();

        } catch(err) {

            console.log(err);

        }

    }, [user.classrooms, setRooms]);
    
    return rooms;

}

export const useUserRoomsInfoByRole = () => {

    const rooms = useUserRoomsInfo();
    const user = useAuthorizedUser();
    const [ roomsByRole, setRoomsByRole ] = useState([]);

    useEffect(() => {

        if( !rooms.length ) {
            setRoomsByRole({});
            return;
        }

        const groupReducer = (groups, room) => {

            const { role } = room.staff.find( member => member.user === user._id );

            return {
                ...groups,
                [role]: groups[role] ? [ ...groups[role], room ] : [ room ]
            }

        }

        setRoomsByRole( rooms.reduce( groupReducer, {} ) );

    }, [rooms, user, setRoomsByRole]);

    return roomsByRole;

}