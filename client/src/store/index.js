import React,{ createContext, useContext, useReducer } from "react";

import {
    LOGIN_USER,
    LOGOUT_USER
} from "./actions";

const StoreContext = createContext({
    userAuth: {}
});

const { Provider } = StoreContext;

const reducer = ( state, { type, payload } ) => {

    const actions = {
        [LOGIN_USER]: () => ({ ...state, userAuth: payload }),
        [LOGOUT_USER]: () => ({ ...state, userAuth: undefined })
    };

    return actions.hasOwnProperty( type )

        ? actions[type]()

        : state;

}

export const getStoreAction = ( type, payload ) => {

    return { type, payload };

}

export const StoreProvider = ( { children } ) => {

    const [ store, storeDispatch ] = useReducer( reducer, {
        userAuth: undefined
    } );

    return <Provider value={{ store, storeDispatch }}>{ children }</Provider>

}

export const useStoreContext = () => {

    return useContext( StoreContext );

}