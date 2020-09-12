import { useEffect } from "react";
import socketIOClient from "socket.io-client";
import api from "./api";
import { useStoreDispatch, getStoreAction as gsa, useStoreContext } from "../store";
import { SET_SOCKET } from "../store/actions";

export const useSocketConnection = () => {

    const dispatch = useStoreDispatch();

    useEffect(() => {

        // const socket = socketIOClient(`http://localhost:3000/${roomId}?token=${localStorage.jwtToken}`);
        const openSocket = socketIOClient(`${window.location.origin}`);

        dispatch( gsa( SET_SOCKET, openSocket ) );

        openSocket.on("connect", () => api.setHeader( "User-Socket-Id", openSocket.id ));
        
        return () => {
            openSocket.disconnect();
            api.setHeader( "User-Socket-Id", false );
            dispatch( gsa( SET_SOCKET, false ) );
        }

    }, [dispatch]);

};

export const useSocket = () => {

    const [ { socket } ] = useStoreContext();

    return socket;

}