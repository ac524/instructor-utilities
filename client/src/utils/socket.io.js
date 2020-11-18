import { useEffect } from "react";
import socketIOClient from "socket.io-client";
import api from "./api";
import { useStoreDispatch, getStoreAction as gsa, useStoreContext } from "../store";
import { SET_SOCKET, UPDATE_USER } from "../store/actions";
import { useIsAuthenticated } from "./auth";

export const useSocketConnection = () => {

    const dispatch = useStoreDispatch();

    useEffect(() => {

        const openSocket = socketIOClient(`${window.location.origin}`, {
            transportOptions: {
              polling: {
                extraHeaders: {
                  'Authorization': localStorage.getItem("jwtToken")
                }
              }
            }
          });

        // openSocket.on("disconnet", message => {
        //     console.log("lost");
        // });

        openSocket.on("connect", () => {
            api.setHeader( "User-Socket-Id", openSocket.id )
            dispatch( gsa( SET_SOCKET, openSocket ) );
        });

        // openSocket.on("test", message => {
        //     console.log(message);
        // });
        
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