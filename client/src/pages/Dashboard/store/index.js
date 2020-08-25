import React,{ createContext, useContext, useReducer } from "react";

import {
    /**
     * TOPBAR ACTIONS
     */
    SET_TOPBAR,

    /**
     * STUDENT VIEW ACTIONS
     */
    SET_STUDENTS,
    ADD_STUDENT,
    UPDATE_STUDENT,
    REMOVE_STUDENT
} from "./actions";

const DashboardContext = createContext([
    {
        students: [],
        topbar: {}
    },
    () => undefined
]);

const { Provider } = DashboardContext;

const reducer = ( state, { type, payload } ) => {

    const actions = {
        /**
         * TOPBAR VIEW ACTIONS
         */
        [SET_TOPBAR]: () => ({ ...state, topbar: payload }),

        /**
         * STUDENT VIEW ACTIONS
         */
        [SET_STUDENTS]: () => ({ ...state, students: [ ...payload ] }),
        [ADD_STUDENT]: () => ({ ...state, students: [ ...state.students, payload ] }),
        [UPDATE_STUDENT]: () => ({
            ...state,
            students: state.students.map( student => student._id === student ? payload : student )
        }),
        [REMOVE_STUDENT]: () => ({
            ...state,
            students: state.students.filter( student => student._id !== payload )
        })
    };

    return actions.hasOwnProperty( type )

        ? actions[type]()

        : state;

}

export const getDashboardAction = ( type, payload ) => {

    return { type, payload };

}

export const DashboardProvider = ( { children } ) => {

    const reducerState = useReducer( reducer, {
        students: [],
        topbar: undefined
    } );

    return <Provider value={reducerState}>{ children }</Provider>

}

export const useDashboardContext = () => {

    return useContext( DashboardContext );

}