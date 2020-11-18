import { getDashboardAction as gda } from "./";
import { useDashboardDispatch } from "./getters";
import { useEffect } from "react";
import { ADD_STUDENT_FEED_ITEMS, SET_CLASSROOM, SET_STUDENT_FEED } from "./actionsNames";
import api from "utils/api";
import { useReadyStep } from "utils/ready";
import { useSocket } from "utils/socket.io";

export const useClassroomLoader = ( roomId ) => {

    const dispatch = useDashboardDispatch();
    const socket = useSocket();
    const [ completeStep, uncompleteStep, isStepComplete ] = useReadyStep("getclassroom");

    useEffect(() => {

        if( !roomId || !socket ) return;
        
        const loadClassroom = async () => {

            try {

                const { data } = await api.getClassroom( roomId );

                dispatch(gda(SET_CLASSROOM, data));

            } catch( err ) {

                dispatch(gda(SET_CLASSROOM, null));

            }

            completeStep();

        }

        /**
         * HACK FIX FOR DASHBOARD UNMOUNTING DURING LOGIN PROCESS AND CAUSE DISPATCH ON AN UNMOUNTED COMPONENT.
         * NEED TO FIND REAL ISSUE
         */
        // loadClassroom();
        const timeout = setTimeout( loadClassroom, 500 );

        return () => {
            dispatch(gda(SET_CLASSROOM, null));
            socket.emit("leave", `room/${roomId}`);
            uncompleteStep();
            clearTimeout(timeout)
        };
        
    }, [ roomId, socket, dispatch, completeStep, uncompleteStep ]);

    return isStepComplete;

}

export const useStudentFeedLoader = ( feedId ) => {

    const dispatch = useDashboardDispatch();
    const socket = useSocket();

    useEffect(() => {

        if( !feedId ) return dispatch(gda( SET_STUDENT_FEED, null ));

        const addItems = ( message ) => dispatch( gda( ADD_STUDENT_FEED_ITEMS, message ) );

        const connectFeed = async () => {
            dispatch( gda( SET_STUDENT_FEED, (await api.getFeedItems(feedId)).data ) );
            socket.emit( "join:feed", feedId );
            socket.on( "feed:push", addItems );
        };

        try {

            connectFeed();

        } catch(err) {

            console.log( err );

        }

        return () => {

            dispatch(gda( SET_STUDENT_FEED, undefined ));
            socket.emit( "leave:feed", feedId );
            socket.off( "feed:push", addItems );

        }

    },[ feedId, dispatch, socket ]);

}