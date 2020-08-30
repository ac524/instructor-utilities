import React,{ createContext, useContext, useReducer } from "react";

import {
    LOGIN_USER,
    LOGOUT_USER,
    ADD_READY_STEP,
    REMOVE_READY_STEP,
    COMPLETE_READY_STEP,
    UNCOMPLETE_READY_STEP
} from "./actions";

const StoreContext = createContext({
    ready: {
        complete: [],
        steps: []
    },
    userAuth: {
        token: null,
        user: null
    }
});

const { Provider } = StoreContext;

const reducer = ( state, { type, payload } ) => {

    const actions = {
        [LOGIN_USER]: () => ({ ...state, userAuth: payload }),
        [LOGOUT_USER]: () => ({ ...state, userAuth: { token: null, user: null } }),
        [ADD_READY_STEP]: () => {
            return {
                ...state,
                ready: {
                    ...state.ready,
                    steps: [
                        ...state.ready.steps,
                        payload
                    ]
                }
            }
        },
        [REMOVE_READY_STEP]: () => {
            return {
                ...state,
                ready: {
                    ...state.ready,
                    steps: state.ready.steps.filter( step => step !== payload ),
                    complete: state.ready.complete.filter( step => step !== payload )
                }
            }
        },
        [COMPLETE_READY_STEP]: () => {
            return {
                ...state,
                ready: {
                    ...state.ready,
                    complete: [
                        ...state.ready.complete,
                        payload
                    ]
                }
            }
        },
        [UNCOMPLETE_READY_STEP]: () => {
            return {
                ...state,
                ready: {
                    ...state.ready,
                    complete: state.ready.complete.filter( step => step !== payload )
                }
            }
        },
    };

    return actions.hasOwnProperty( type )

        ? actions[type]()

        : state;

}

export const getStoreAction = ( type, payload ) => {

    return { type, payload };

}

export const StoreProvider = ( { children } ) => {

    const reducerState = useReducer( reducer, {
        ready: {
            complete: [],
            steps: []
        },
        userAuth: {
            token: null,
            user: null
        }
    } );

    return <Provider value={reducerState}>{ children }</Provider>

}

export const useStoreContext = () => {

    return useContext( StoreContext );

}