import React, { useEffect, useReducer, useState } from "react";

import {
    Heading,
    Box,
    Button
} from "react-bulma-components";

import SelectStudent from "../Apps/SelectStudent";
import Pulse from "components/Pulse";
import api from "utils/api";
import { useSocket } from "utils/socket.io";

import "./style.sass";
import Icon from "components/Icon";

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

    const [ isFullscreen, setIsFullscreen ] = useState( false );

    const toggleFullscreen = () => setIsFullscreen( !isFullscreen );

    useEffect(() => {

        const handleAppUpdateMessage = ( message ) => {

            dispatch( { type: "UPDATE_APP", payload: message } );

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

    const classes = ["app-widget"];

    if(isFullscreen) classes.push("is-fullscreen");

    props.className = classes.join(" ") + (props.className ? " "+props.className : "");

    return (
        <Box {...props}>
            {
                app

                ? (
                    <div>
                        <div className="is-flex mb-4">
                            <Heading size={4} renderAs="h2" className="m-0">{app.name}</Heading>
                            <Button className="ml-auto" size="small" onClick={toggleFullscreen}><Icon icon={isFullscreen ? "compress-alt" : "expand-alt"} /></Button>
                        </div>
                        { getAppComponent(app, setAppData) }
                    </div>
                )

                : <Pulse />
            }
        </Box>
    )

}

export default Widget;