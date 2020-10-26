import React,{ createContext, useContext, useReducer } from "react";

import actions from "./actions";

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

const reducer = ( state, action ) => {

    const doAction = (state, { type, payload }) => {

        return actions.hasOwnProperty( type )

            ? actions[type]( state, payload )

            : state;

    }

    return Array.isArray( action )

        ? action.reduce( doAction, state )

        : doAction( state, action );

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