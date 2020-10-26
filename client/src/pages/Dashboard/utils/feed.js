import { useState } from "react";

import { useDashboardDispatch, getDashboardAction as gda, useClassroom, useEditStudent } from "pages/Dashboard/store";
import { ADD_STUDENT_FEED_ITEMS, UPDATE_STUDENT } from "../store/actionsNames";
import { useSocket } from "utils/socket.io";

export const useHandleFeedEventResponse = () => {

    const dispatch = useDashboardDispatch();
    const socket = useSocket();
    const { _id } = useClassroom();
    const studentId = useEditStudent();

    const [ handleFeedEventResponse ] = useState(() => ( { entries, studentUpdate } ) => {

        if( entries ) {
            const message = gda( ADD_STUDENT_FEED_ITEMS, entries );
            dispatch( message );
            socket.emit( `${studentId}:pushFeedItems`, message );
        }

        if( studentUpdate ) {
            const message = gda( UPDATE_STUDENT, studentUpdate );
            dispatch( message );
            socket.emit( `${_id}:dispatch`, message );
        }

    });

    return handleFeedEventResponse;

}