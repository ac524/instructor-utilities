import React, { useEffect, useState, createContext, useContext } from "react";
import socketIOClient from "socket.io-client";

const SocketContext = createContext({});

const { Provider } = SocketContext;

export const RoomSocketProvider = ({ roomId, children }) => {

    const [ socket, setSocket ] = useState( false );

    useEffect(() => {

        if( !roomId ) return;

        // const socket = socketIOClient(`http://localhost:3000/${roomId}?token=${localStorage.jwtToken}`);
        const openSocket = socketIOClient(`http://localhost:3000/${roomId}`);

        setSocket(openSocket);

        return () => {
            openSocket.disconnect();
            setSocket(false);
        }

    }, [roomId, setSocket]);

    return <Provider value={socket}>{ children }</Provider>

}

export const useRoomSocket = () => useContext( SocketContext );