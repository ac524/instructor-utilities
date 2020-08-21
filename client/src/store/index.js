import React,{ createContext, useContext, useReducer } from "react";

import {
    LOGIN_USER,
    LOGOUT_USER
} from "./actions";

const StoreContext = createContext({
    user: {}
});

const { Provider } = StoreContext;

const reducer = ( state, { type, payload } ) => {

    const actions = {
        [LOGIN_USER]: () => ({ ...state, user: payload }),
        [LOGOUT_USER]: () => ({ ...state, user: {} })
    };

    return actions.hasOwnProperty( type )

        ? actions[type]()

        : state;

}

export const StoreProvider = ( { children } ) => {

    const [ store, storeDispatch ] = useReducer( reducer, {
        user: {}
    } );

    return <Provider value={{ store, storeDispatch }}>{ children }</Provider>

}

export const useStoreContext = () => {

    return useContext( StoreContext );

}