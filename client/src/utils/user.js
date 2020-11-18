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

        const updateUser = data => dispatch( gsa( UPDATE_USER, data ) );

        socket.emit( "join:user", user._id );
        socket.on( "user:update", updateUser );

        return () => {

            socket.emit( "leave:user", user._id );
            socket.off( "user:update", updateUser );

        }

    },[ user, dispatch, socket ]);

}

const makeHandleUserUpdate = ( dispatch, socket, user ) => {

    if( !user ) return () => {};

    return ( update ) => {

        dispatch( gsa( UPDATE_USER, update ) );
        socket.emit( `${user._id}:update`, update );

    }

}

export const useHandleUserUpdate = () => {

    const dispatch = useStoreDispatch();
    const socket = useSocket();
    const user = useAuthorizedUser();

    const [ handleUserUpdate, setHandleUserUpdate ] = useState(() => makeHandleUserUpdate(dispatch,socket,user));

    useEffect(() => {

        setHandleUserUpdate(() => makeHandleUserUpdate(dispatch,socket,user));

    }, [dispatch,socket,user]);

    return handleUserUpdate;

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