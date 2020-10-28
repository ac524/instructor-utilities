import { useState } from "react";

import { useDashboardDispatch, getDashboardAction as gda, useClassroom } from "pages/Dashboard/store";
import { ADD_STUDENT_FEED_ITEMS, UPDATE_STUDENT } from "../store/actionsNames";
import { useSocket } from "utils/socket.io";

export const useHandleFeedEventResponse = (feedId) => {

    const dispatch = useDashboardDispatch();
    const socket = useSocket();
    const { _id } = useClassroom();

    const [ handleFeedEventResponse ] = useState(() => ( { entries, studentUpdate } ) => {

        if( entries ) {
            dispatch( gda( ADD_STUDENT_FEED_ITEMS, entries ) );
            socket.emit( `${feedId}:push`, entries );
        }

        if( studentUpdate ) {
            const message = gda( UPDATE_STUDENT, studentUpdate );
            dispatch( message );
            socket.emit( `${_id}:dispatch`, message );
        }

    });

    return handleFeedEventResponse;

}