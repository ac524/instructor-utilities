import React, { useEffect, useReducer } from "react";

import {
    Heading,
    Box
} from "react-bulma-components";

import SelectStudent from "./Apps/SelectStudent";
import Pulse from "components/Pulse";
import api from "utils/api";
import { useSocket } from "utils/socket.io";

const getAppComponent = ( app, setAppData ) => {

    const types = {
        studentselect: () => <SelectStudent data={app.data} setData={setAppData} />
    }

    return types[app.type.type]();

}

const Widget = ( { roomId, appTypeId, ...props } ) => {
    
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

    const socket = useSocket();

    useEffect(() => {

        const handleAppUpdateMessage = ( message ) => {

            // // Ignore update message from current user.
            if( !message.from || socket.id === message.from ) return;

            dispatch( { type: "UPDATE_APP", payload: message.payload } );

        }

        socket.on(`appupdate:${appTypeId}`, handleAppUpdateMessage);

        return () => socket.off(`appupdate:${appTypeId}`, handleAppUpdateMessage);

    }, [socket, appTypeId]);

    useEffect(() => {

        if( !roomId || !appTypeId ) return;

        const loadApp = async () => dispatch( { type: "SET_APP", payload: (await api.getApp( roomId, appTypeId )).data } );

        loadApp();

    }, [roomId, appTypeId, dispatch]);

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