import { useEffect, useState } from "react"
import { useStoreDispatch, getStoreAction as gsa } from "store";
import { UPDATE_USER } from "store/actions";
import api from "./api";
import { useAuthorizedUser } from "./auth";
import { useSocket } from "./socket.io";

export const useUserSocketUpdates = () => {

    const user = useAuthorizedUser();
    const dispatch = useStoreDispatch();
    const socket = useSocket();

    useEffect(() => {

        if( !user || !socket ) return;

        console.log(user);

        socket.emit( "join:user", user._id );
        socket.on( "user:update", data => dispatch( gsa( UPDATE_USER, data ) ) );

        return () => {

            socket.emit( "leave:user", user._id );
            socket.off( "user:update", addItems );

        }

    },[ user, dispatch, socket ]);

}

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