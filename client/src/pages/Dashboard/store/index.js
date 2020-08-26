import React,{ createContext, useContext, useReducer } from "react";

import {
    /**
     * TOPBAR ACTIONS
     */
    SET_TOPBAR,

    /**
     * CLASSROOM ACTIONS
     */
    SET_CLASSROOM,

    /**
     * STUDENT VIEW ACTIONS
     */
    SET_STUDENTS,
    ADD_STUDENT,
    UPDATE_STUDENT,
    REMOVE_STUDENT,
    EDIT_STUDENT
} from "./actions";

const DashboardContext = createContext([
    {
        classroom: {
            _id: "",
            name: "",
            staff: [],
            students: []
        },
        editStudent: "",
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
         * CLASSROOM ACTIONS
         */
        [SET_CLASSROOM]: () => ({ ...state, classroom: payload }),

        /**
         * STUDENT VIEW ACTIONS
         */
        [SET_STUDENTS]: () => ({
            ...state,
            classroom: {
                ...state.classroom,
                students: payload
            }
        }),
        [ADD_STUDENT]: () => ({
            ...state,
            classroom: {
                ...state.classroom,
                students: [ ...state.classroom.students, payload ]
            }
        }),
        [UPDATE_STUDENT]: () => ({
            ...state,
            classroom: {
                ...state.classroom,
                students: state.classroom.students.map( student => student._id === payload._id ? payload : student )
            }
        }),
        [REMOVE_STUDENT]: () => ({
            ...state,
            classroom: {
                ...state.classroom,
                students: state.classroom.students.filter( student => student._id !== payload )
            }
        }),
        [EDIT_STUDENT]: () => ({
            ...state,
            editStudent: payload
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
        classroom: {
            _id: "",
            name: "",
            staff: [],
            students: []
        },
        editStudent: undefined,
        topbar: undefined
    } );

    return <Provider value={reducerState}>{ children }</Provider>

}

export const useDashboardContext = () => {

    return useContext( DashboardContext );

}

export * from "./getters";