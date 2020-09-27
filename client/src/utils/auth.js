import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

import api from "./api";
import { useStoreContext, getStoreAction as gsa } from "store";
import { LOGIN_USER, LOGOUT_USER } from "store/actions";
import { useHistory } from "react-router-dom";
import { createValidator } from "components/Form";
import { useSocket } from "./socket.io";

const setAuthToken = token => {

    storeAuthToken( token );
    applyAuthToken( token );

    return token ? jwt_decode(token) : undefined;

}

const storeAuthToken = token => {

    token

        ? localStorage.setItem("jwtToken", token)
        
        : localStorage.removeItem( "jwtToken" );

}

const applyAuthToken = token => {

    token

        // Apply authorization token to every request if logged in
        ? api.setHeader( "Authorization", token )

        // Delete auth header
        : api.setHeader( "Authorization", false );

};

export const useAuthTokenStore = () => {

    const [ ,dispatch ] = useStoreContext();
    const [ isDone, setIsDone ] = useState(false);
    const socket = useSocket();

    const history = useHistory();

    useEffect(() => {

        if( !socket || isDone ) return;

        // Check for token to keep user logged in
        if ( !localStorage.jwtToken ) {
            setIsDone( true );
            return;
        }
            
        // Set auth token header auth
        const tokenString = localStorage.jwtToken;
        
        // Decode token and get user info and exp
        const token = jwt_decode(tokenString);
        
        // Check for expired token
        const currentTime = Date.now() / 1000; // to get in milliseconds

        const invalidate = () => {

            // Logout user
            setAuthToken( false );
            dispatch(gsa( LOGOUT_USER ));
            
            // Redirect to login
            history.push("/");

        }
        
        if (token.exp < currentTime) {
            
            invalidate();

        } else {

            applyAuthToken(tokenString);

            const authCheck = async () => {

                let user;

                try {

                    const { data } = await api.authenticated();

                    user = data;

                } catch(res) {
                    
                    invalidate();

                }

                if( user ) dispatch(gsa( LOGIN_USER, { token, user } ));

                setIsDone( true );

            }

            authCheck();

        }

    }, [ socket, dispatch, history, isDone ])

    return isDone;

}

export const useIsAuthenticated = () => {

    const [ { userAuth: { token } } ] = useStoreContext();

    return token && token.exp > Date.now() / 1000;

}

export const useAuthorizedUser = () => {

    const [ { userAuth } ] = useStoreContext();

    return userAuth.user;

}

export const useIsUserVerified = () => {

    const user = useAuthorizedUser();

    return user && user.isVerified;

}

export const useLogin = () => {

    const [ ,dispatch ] = useStoreContext();

    return async ( credential ) => {
    
        const { data: { token: tokenString, user } } = await api.login( credential );

        const token = setAuthToken( tokenString );

        dispatch(gsa( LOGIN_USER, { token, user } ));

        return token;
        
    }
    
}

export const useLogout = () => {

    const [ ,dispatch ] = useStoreContext();
    const history = useHistory();

    return () => {

        setAuthToken( false );
        dispatch(gsa(LOGOUT_USER));

        history.push("/");

    }
    
}

export const validateRegistrationData = createValidator({
    validators: {
        name: ({ name }) => Boolean(name) || "Your name is required",
        email: ({ email }) => Boolean(email) || "Email is required",
        password: ({ password, password2 }) => {

            const errors = [];

            if( password ) {

                // TODO stronger password validation for both client and server.
                if( password.length < 6 ) errors.push(["password", "Password must be at least 6 characters"] );

            } else {
                errors.push( ["password", "Password is required"] );
            }

            if( !password2 ) errors.push( ["password2", "Confirm password is required"] );

            if( !errors.length ) {
                
                if( password !== password2 ) errors.push( ["password", "Passwords must match"], ["password2", "Passwords must match"] );

            }

            if( errors.length ) return Object.fromEntries( errors );

        },
        roomname: ({ roomname }) => Boolean(roomname) || "Room name is required",
    }
});