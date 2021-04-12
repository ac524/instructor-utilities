import { useState } from "react";

import { useDashboardDispatch, getDashboardAction as gda, useClassroom } from "pages/Dashboard/store";
import { ADD_STUDENT_FEED_ITEMS, DELETE_STUDENT_FEED_ITEMS, UPDATE_STUDENT, UPDATE_STUDENT_FEED_ITEMS } from "../store/actionsNames";
import { useSocket } from "utils/socket.io";

const actionsMap = {
    push: ADD_STUDENT_FEED_ITEMS,
    update: UPDATE_STUDENT_FEED_ITEMS,
    delete: DELETE_STUDENT_FEED_ITEMS
}

export const useHandleFeedEventResponse = (feedId) => {

    const dispatch = useDashboardDispatch();
    const socket = useSocket();
    const { _id } = useClassroom();

    const [ handleFeedEventResponse ] = useState(() => ( { entries, studentUpdate }, action = "push" ) => {

        console.log(action,actionsMap[action], entries );

        if( entries ) {
            dispatch( gda( actionsMap[action], entries ) );

            if(action === "push") socket.emit( `${feedId}:push`, entries );
        }

        if( studentUpdate ) {
            const message = gda( UPDATE_STUDENT, studentUpdate );
            dispatch( message );
            socket.emit( `${_id}:dispatch`, message );
        }

    });

    return handleFeedEventResponse;

}