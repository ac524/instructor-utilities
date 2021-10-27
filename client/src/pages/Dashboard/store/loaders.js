import { getDashboardAction as gda } from "./";
import { useDashboardDispatch } from "./getters";
import { useEffect, useState } from "react";
import { ADD_STUDENT_FEED_ITEMS, DELETE_STUDENT_FEED_ITEMS, SET_CLASSROOM, SET_CR_AND_PERMS, SET_STUDENT_FEED, UPDATE_STUDENT_FEED_ITEMS } from "./actionsNames";
import api from "utils/api";
import { useReadyStep } from "utils/ready";
import { useSocket } from "utils/socket.io";

export const useClassroomLoader = ( roomId ) => {

    const dispatch = useDashboardDispatch();
    const socket = useSocket();
    const [ completeStep, uncompleteStep, isStepComplete ] = useReadyStep("getclassroom");
    const [ currentRoomId, setCurrentRoomId ] = useState( roomId );

    useEffect(() => {

        if( !roomId || !socket ) return;
        
        const loadClassroom = async () => {

            setCurrentRoomId( roomId );

            try {

                const { data: classroom } = await api.getClassroom( roomId );
                const { data: permissions } = await api.getClassroomPerms( roomId );

                dispatch(gda(SET_CR_AND_PERMS, { classroom, permissions }));

            } catch( err ) {

                dispatch(gda(SET_CR_AND_PERMS, { classroom: null, permissions: [] }));

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
            uncompleteStep();
            dispatch(gda(SET_CLASSROOM, null));
            socket.emit("leave", `room/${roomId}`);
            clearTimeout(timeout)
        };
        
    }, [ roomId, socket, dispatch, completeStep, uncompleteStep, setCurrentRoomId ]);

    return isStepComplete && roomId === currentRoomId;

}

export const useStudentFeedLoader = ( feedId ) => {

    const dispatch = useDashboardDispatch();
    const socket = useSocket();

    useEffect(() => {

        if( !feedId ) return dispatch(gda( SET_STUDENT_FEED, null ));

        const addItems = ( message ) => dispatch( gda( ADD_STUDENT_FEED_ITEMS, message ) );
        const updateItems = ( message ) => dispatch( gda( UPDATE_STUDENT_FEED_ITEMS, message ) );
        const deleteItems = ( message ) => dispatch( gda( DELETE_STUDENT_FEED_ITEMS, message ) );

        const connectFeed = async () => {
            dispatch( gda( SET_STUDENT_FEED, (await api.getFeedItems(feedId)).data ) );
            socket.emit( "join:feed", feedId );
            socket.on( "feed:push", addItems );
            socket.on( "feed:update", updateItems );
            socket.on( "feed:delete", deleteItems );
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