import React, { useState, useEffect, useReducer } from "react";

import {
    Heading,
    Box
} from "react-bulma-components";

import SelectStudent from "./Apps/SelectStudent";
import Pulse from "../../../../../components/Pulse";
import { useRoomSocket } from "../../../utils/socket.io";
import api from "../../../../../utils/api";
import { useAuthorizedUser } from "../../../../../utils/auth";

const getAppComponent = ( app, setAppData ) => {

    const types = {
        studentselect: () => <SelectStudent data={app.data} setData={setAppData} />
    }

    return types[app.type.type]();

}

const Widget = ( { roomId, appTypeId, ...props } ) => {

    const user = useAuthorizedUser();
    const [ app, dispatch ] = useReducer( ( state, { type, payload } ) => {
        switch(type) {
            case "SET_APP":
                return payload;
            case "UPDATE_APP":
                return { ...state, ...payload };
            default:
                return  state;
        }
    }, null );
    const socket = useRoomSocket();
    console.log(socket.id);

    useEffect(() => {

        if( !roomId || !appTypeId ) return;

        console.log("INITIALIZE APP");

        const loadApp = async () => dispatch( { type: "SET_APP", payload: (await api.getApp( roomId, appTypeId )).data } );

        const handleAppUpdateMessage = ( message ) => {

            console.log( "RECIEVE UPDATE" );

            // Ignore update message from current user.
            if( message.from === user._id ) return;

            console.log( "ACCEPT UPDATE" );

            dispatch( { type: "UPDATE_APP", payload: message.update } );

        }

        loadApp();

        socket.on(`appupdate:${appTypeId}`, handleAppUpdateMessage);

        return () => socket.off(`appupdate:${appTypeId}`, handleAppUpdateMessage);

    }, [socket, roomId, appTypeId, dispatch, user]);

    const setAppData = async ( data ) => {

        dispatch( { type: "UPDATE_APP", payload: { data } } );

        await api.updateApp( roomId, appTypeId, { data } );
        
    }

    return (
        <Box {...props}>
            {
                app

                ? (
                    <div>
                        <Heading size={4}>{app.name}</Heading>
                        { getAppComponent(app, setAppData) }
                    </div>
                )

                : <Pulse />
            }
        </Box>
    )

}

export default Widget;