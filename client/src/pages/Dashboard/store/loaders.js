import { getDashboardAction as gda } from "./";
import { useDashboardDispatch } from "./getters";
import { useEffect } from "react";
import { SET_CLASSROOM, SET_STUDENT_FEED } from "./actionsNames";
import api from "utils/api";
import { useReadyStep } from "utils/ready";
import { useSocket } from "utils/socket.io";

export const useClassroomLoader = ( roomId ) => {

    const dispatch = useDashboardDispatch();
    const socket = useSocket();
    const [ completeStep, uncompleteStep, isStepComplete ] = useReadyStep("getclassroom");

    useEffect(() => {

        if( !roomId ) return;
        
        const loadClassroom = async () => {

            try {

                const { data } = await api.getClassroom( roomId );

                // console.log( data );

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

    useEffect(() => {

        if( !feedId ) return dispatch(gda( SET_STUDENT_FEED, null ));

        const connectFeed = async () => dispatch(gda( SET_STUDENT_FEED, (await api.getFeedItems(feedId)).data ));

        try {

            connectFeed();

        } catch(err) {

            console.log( err );

        }

    },[ feedId, dispatch ]);

}