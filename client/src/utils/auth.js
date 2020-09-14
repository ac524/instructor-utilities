import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

import api from "./api";
import { useStoreContext, getStoreAction as gsa } from "../store";
import { LOGIN_USER, LOGOUT_USER } from "../store/actions";
import { useHistory } from "react-router-dom";

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

    const history = useHistory();

    useEffect(() => {

        if( isDone ) return;

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

                console.log( user );

                if( user ) dispatch(gsa( LOGIN_USER, { token, user } ));

                setIsDone( true );

            }

            authCheck();

        }

    }, [ dispatch, history, isDone ])

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