import { useState } from "react";

import { useDashboardDispatch, getDashboardAction as gda } from "pages/Dashboard/store";
import { ADD_STUDENT_FEED_ITEMS, UPDATE_STUDENT } from "../store/actions";

export const useHandleFeedEventResponse = () => {

    const dispatch = useDashboardDispatch();

    const [ handleFeedEventResponse ] = useState(() => ( { entries, studentUpdate } ) => {

        if( entries ) dispatch(gda( ADD_STUDENT_FEED_ITEMS, entries ) );

        if( studentUpdate ) dispatch(gda( UPDATE_STUDENT, studentUpdate ) );

    });

    return handleFeedEventResponse;

}