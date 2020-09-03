import { getDashboardAction as gda } from "./";
import { useDashboardDispatch } from "./getters";
import { useReadyStep } from "utils/ready";
import { useEffect } from "react";
import api from "utils/api";
import { SET_CLASSROOM } from "./actions";

export const useClassroomLoader = ( roomId ) => {

    const dispatch = useDashboardDispatch();
    const [ completeStep, uncompleteStep, isStepComplete ] = useReadyStep("getclassroom");

    useEffect(() => {

        if( !roomId ) return;
        
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
        const timeout = setTimeout( loadClassroom, 1000 );

        return () => {
            uncompleteStep();
            clearTimeout(timeout)
        };
        
    }, [ roomId, dispatch, completeStep, uncompleteStep ]);

    return isStepComplete;

}