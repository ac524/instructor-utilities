import React,{ createContext, useContext, useReducer } from "react";

import {
    /**
     * Socket Actions
     */
    SET_SOCKET,

    /**
     * Login Actions
     */
    LOGIN_USER,
    LOGOUT_USER,

    UPDATE_USER,
    ADD_USER_ROOM_ID,

    /**
     * Ready Step Actions
     */
    ADD_READY_STEP,
    REMOVE_READY_STEP,
    COMPLETE_READY_STEP,
    UNCOMPLETE_READY_STEP
} from "./actions";

const StoreContext = createContext({
    socket: null,
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
        [SET_SOCKET]: () => ({ ...state, socket: payload }),
        [LOGIN_USER]: () => ({ ...state, userAuth: payload }),
        [LOGOUT_USER]: () => ({ ...state, userAuth: { token: null, user: null } }),
        [UPDATE_USER]: () => ({
            ...state,
            userAuth: {
                ...state.userAuth,
                user: {
                    ...state.userAuth.user,
                    ...payload
                }
            }
        }),
        [ADD_USER_ROOM_ID]: () => ({
            ...state,
            userAuth: {
                ...state.userAuth,
                user: {
                    ...state.userAuth.user,
                    classrooms: [ ...state.userAuth.user.classrooms, payload ]
                }
            }
        }),
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
        socket: null,
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

export const useStoreDispatch = () => {

    const [ ,dispatch ] = useStoreContext();

    return dispatch;

}