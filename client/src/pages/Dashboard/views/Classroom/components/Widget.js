import React, { useState, useEffect } from "react";

import {
    Heading,
    Box
} from "react-bulma-components";

import SelectStudent from "./Apps/SelectStudent";
import Pulse from "../../../../../components/Pulse";
import { useRoomSocket } from "../../../utils/socket.io";
import api from "../../../../../utils/api";

const getAppComponent = ( app, setAppData ) => {

    const types = {
        studentselect: () => <SelectStudent data={app.data} setData={setAppData} />
    }

    return types[app.type.type]();

}

const Widget = ( { roomId, appTypeId, ...props } ) => {

    const [ app, setApp ] = useState( null );
    const socket = useRoomSocket();

    useEffect(() => {

        if( !roomId || !appTypeId ) return;

        const loadApp = async () => setApp( (await api.getApp( roomId, appTypeId )).data );

        const handleAppUpdate = ( update ) => {
            console.log( update );
        }

        loadApp();

        socket.on(`appupdate:${appTypeId}`, handleAppUpdate);

        return () => socket.off(`appupdate:${appTypeId}`, handleAppUpdate)

    }, [socket, roomId, appTypeId, setApp]);

    const setAppData = async ( data ) => {

        setApp({ ...app, data });
        
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