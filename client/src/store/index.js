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
    ready: {},
    userAuth: {}
});

const { Provider } = StoreContext;

const reducer = ( state, { type, payload } ) => {

    const actions = {
        [LOGIN_USER]: () => ({ ...state, userAuth: payload }),
        [LOGOUT_USER]: () => ({ ...state, userAuth: undefined }),
        [ADD_READY_STEP]: () => {
            return {
                ...state,
                ready: {
                    ...state.ready,
                    when: [
                        ...state.ready.when,
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
                    when: state.ready.when.filter( step => step !== payload )
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
            when: []
        },
        userAuth: undefined
    } );

    return <Provider value={reducerState}>{ children }</Provider>

}

export const useStoreContext = () => {

    return useContext( StoreContext );

}