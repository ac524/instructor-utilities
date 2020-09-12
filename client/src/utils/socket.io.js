import { useEffect } from "react";
import socketIOClient from "socket.io-client";
import api from "./api";
import { useStoreDispatch, getStoreAction as gsa, useStoreContext } from "../store";
import { SET_SOCKET, UPDATE_USER } from "../store/actions";
import { useIsAuthenticated } from "./auth";

export const useSocketConnection = () => {

    const dispatch = useStoreDispatch();

    useEffect(() => {

        // const socket = socketIOClient(`http://localhost:3000/${roomId}?token=${localStorage.jwtToken}`);
        const openSocket = socketIOClient(`${window.location.origin}`);

        openSocket.on("connect", () => {
            api.setHeader( "User-Socket-Id", openSocket.id )
            dispatch( gsa( SET_SOCKET, openSocket ) );
        });
        
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

export const useAuthSubscription = () => {

    const dispatch = useStoreDispatch();
    const socket = useSocket();
    const isAuth = useIsAuthenticated();

    useEffect(() => {

        if( !socket || !isAuth ) return;

        api.subscribe();

        const updateUser = data => dispatch( gsa( UPDATE_USER, data ) );

        socket.on("updateUser", updateUser);

        return () => socket.off("updateUser", updateUser);

    }, [socket, isAuth])

}