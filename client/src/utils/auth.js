import { useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

import api from "./api";
import { useStoreContext } from "../store";
import { LOGIN_USER, LOGOUT_USER } from "../store/actions";

export const setAuthToken = token => {

    storeAuthToken( token );
    applyAuthToken( token );

    return token ? jwt_decode(token) : undefined;

}

export const storeAuthToken = token => {

    token

        ? localStorage.setItem("jwtToken", token)
        
        : localStorage.removeItem( "jwtToken" );

}

export const applyAuthToken = token => {

    token

        // Apply authorization token to every request if logged in
        ? axios.defaults.headers.common["Authorization"] = token

        // Delete auth header
        : delete axios.defaults.headers.common["Authorization"];

};

export const useAuthTokenStore = () => {

    const { storeDispatch } = useStoreContext();

    useEffect(() => {
        // Check for token to keep user logged in
        if (localStorage.jwtToken) {
            
            // Set auth token header auth
            const token = localStorage.jwtToken;
            
            // Decode token and get user info and exp
            const decoded = jwt_decode(token);
            
            // Check for expired token
            const currentTime = Date.now() / 1000; // to get in milliseconds

            const invalidate = () => {

                // Logout user
                setAuthToken( false );
                storeDispatch({ type: LOGOUT_USER });
                
                // Redirect to login
                window.location.href = "./";

            }
            
            if (decoded.exp < currentTime) {
                
                invalidate();

            } else {

                applyAuthToken(token);

                // Validate the token with the server
                api
                    .authenticated()
                    .then( () => storeDispatch({
                        type: LOGIN_USER,
                        payload: decoded
                    }) )
                    .catch( invalidate );

            }

        }
    }, [])

}

export const useIsAuthenticated = () => {

    const { store: { user } } = useStoreContext();

    return Boolean( user.id );

}

export const useLogin = () => {

    const { storeDispatch } = useStoreContext();

    return async ( credential ) => {
    
        const { data: { token } } = await api.login( credential );

        const user = setAuthToken( token );

        storeDispatch({
            type: LOGIN_USER,
            payload: user
        });

        return user;
        
    }
    
}

export const useLogout = () => {

    const { storeDispatch } = useStoreContext();

    return () => {

        setAuthToken( false );
        storeDispatch( { type: LOGOUT_USER } );

        window.location.href = "./";

    }
    
}