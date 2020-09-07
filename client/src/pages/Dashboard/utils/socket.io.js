import React, { useEffect, useState, createContext, useContext } from "react";
import socketIOClient from "socket.io-client";
import api from "../../../utils/api";

const SocketContext = createContext({});

const { Provider } = SocketContext;

export const RoomSocketProvider = ({ roomId, children }) => {

    const [ socket, setSocket ] = useState( false );

    useEffect(() => {

        if( !roomId ) return;

        // const socket = socketIOClient(`http://localhost:3000/${roomId}?token=${localStorage.jwtToken}`);
        const openSocket = socketIOClient(`${window.location.origin}/${roomId}`);

        setSocket(openSocket);

        openSocket.on("connect", () => api.setHeader( "Room-Socket-Id", openSocket.id ) );
        
        return () => {
            openSocket.disconnect();
            api.setHeader( "Room-Socket-Id", false );
            setSocket(false);
        }

    }, [roomId, setSocket]);

    return <Provider value={socket}>{ children }</Provider>

}

export const useRoomSocket = () => useContext( SocketContext );