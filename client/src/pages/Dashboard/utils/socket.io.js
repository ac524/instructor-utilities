import { useEffect } from "react";
import socketIOClient from "socket.io-client";

import { useDashboardDispatch } from "../store";

export const useRoomSocketDispatch = (roomId) => {

    const dispatch = useDashboardDispatch();

    useEffect(() => {

        if( !roomId ) return;

        // const socket = socketIOClient(`http://localhost:3000/${roomId}?token=${localStorage.jwtToken}`);
        const socket = socketIOClient(`http://localhost:3000/${roomId}`);

        // console.log( localStorage.jwtToken.substr(7) );
        // console.log( localStorage.jwtToken );

        // socket.on('connect', () => {
        //     socket
        //         //send the jwt
        //         .emit('authenticate', { token: localStorage.jwtToken.substr(7) })
        //         .on('authenticated', () => {

        //             //do other things
        //             console.log('authenticated');

        //             socket.emit('authenticated');

        //         })
        //         .on('unauthorized', (msg) => {

        //             console.log(`unauthorized: ${JSON.stringify(msg.data)}`);
        //             // throw new Error(msg.data.type);

        //         })
        // });

        socket.on("dispatch", data => {

            dispatch(data);

        });

        return () => socket.disconnect();

    }, [ roomId, dispatch ]);
    
}