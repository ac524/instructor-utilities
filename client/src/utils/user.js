import { useEffect, useState } from "react"
import api from "./api";
import { useIsAuthenticated } from "./auth";

export const useUserRoomnames = () => {

    const [ roomnames, setRoomnames ] = useState([]);
    const isAuth = useIsAuthenticated();

    useEffect(() => {

        if( !isAuth ) {
            setRoomnames([])
            return;
        }

        const getRoomnames = async () => setRoomnames( ( await api.userRoomnames() ).data );

        try {

            getRoomnames();

        } catch(err) {

            console.log(err);

        }

    }, [isAuth, setRoomnames]);
    
    return roomnames;

}