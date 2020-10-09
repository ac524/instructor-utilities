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
     * STAFF ACTIONS
     */
    ADD_STAFF,

    /**
     * INVITE ACTIONS
     */
    ADD_INVITE,
    DELETE_INVITE,
    
    /**
     * APP ACTIONS
     */
    SET_MANAGE_APPS,
    ADD_APP,

    /**
     * STUDENT VIEW ACTIONS
     */
    SET_STUDENTS,
    ADD_STUDENT,
    UPDATE_STUDENT,
    REMOVE_STUDENT,

    /**
     * STUDENT MODAL ACTIONS
     */
    EDIT_STUDENT,
    SET_STUDENT_FEED,
    ADD_STUDENT_FEED_ITEM,
    ADD_STUDENT_FEED_ITEMS, ADD_STUDENTS
} from "./actions";

const DashboardContext = createContext([
    {
        classroom: null,
        editStudent: "",
        studentFeed: null,
        topbar: {},
        isManagingApps: false
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
         * STAFF ACTIONS
         */
        [ADD_STAFF]: () => ({
            ...state,
            classroom: {
                ...state.classroom,
                staff: [ ...state.classroom.staff, payload ]
            }
        }),

        /**
         * INVITE ACTIONS
         */
        [ADD_INVITE]: () => ({
            ...state,
            classroom: {
                ...state.classroom,
                invites: [ ...state.classroom.invites, payload ]
            }
        }),
        [DELETE_INVITE]: () => ({
            ...state,
            classroom: {
                ...state.classroom,
                invites: state.classroom.invites.filter( invite => invite._id !== payload )
            }
        }),

        /**
         * APP ACTIONS
         */
        [SET_MANAGE_APPS]: () => ({ ...state, isManagingApps: payload }),
        [ADD_APP]: () => ({
            ...state,
            classroom: {
                ...state.classroom,
                apps: [ ...state.classroom.apps, payload ]
            }
        }),

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
        [ADD_STUDENTS]: () => ({
            ...state,
            classroom: {
                ...state.classroom,
                students: [ ...state.classroom.students, ...payload ]
            }
        }),
        [UPDATE_STUDENT]: () => ({
            ...state,
            classroom: {
                ...state.classroom,
                students: state.classroom.students.map( student => student._id === payload._id ? { ...student, ...payload } : student )
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
        }),
        [SET_STUDENT_FEED]: () => ({
            ...state,
            studentFeed: payload
        }),
        [ADD_STUDENT_FEED_ITEM]: () => ({
            ...state,
            studentFeed: [ ...state.studentFeed, payload ]
        }),
        [ADD_STUDENT_FEED_ITEMS]: () => ({
            ...state,
            studentFeed: [ ...state.studentFeed, ...payload ]
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
        classroom: null,
        editStudent: false,
        studentFeed: null,
        topbar: undefined,
        isManagingApps: false
    } );

    return <Provider value={reducerState}>{ children }</Provider>

}

export const useDashboardContext = () => {

    return useContext( DashboardContext );

}

export * from "./getters";
export * from "./loaders";