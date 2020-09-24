import { getDashboardAction as gda } from "./";
import { useDashboardDispatch } from "./getters";
import { useEffect } from "react";
import { SET_CLASSROOM } from "./actions";
import api from "../../../utils/api";
import { useReadyStep } from "../../../utils/ready";

export const useClassroomLoader = ( roomId ) => {

    const dispatch = useDashboardDispatch();
    const [ completeStep, uncompleteStep, isStepComplete ] = useReadyStep("getclassroom");

    useEffect(() => {

        if( !roomId ) return;
        
        const loadClassroom = async () => {

            try {

                const { data } = await api.getClassroom( roomId );

                console.log( data );

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
            uncompleteStep();
            clearTimeout(timeout)
        };
        
    }, [ roomId, dispatch, completeStep, uncompleteStep ]);

    return isStepComplete;

}