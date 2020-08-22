import React, { createContext, useContext } from "react";

const ErrorContext = createContext();

const { Provider } = ErrorContext;

export const ErrorProvider = ( props ) => {
    return <Provider {...props} />
}

export const Error = ( { name } ) => {

    const { [name]: error } = useContext( ErrorContext );

    return error

        ? <p class="help is-danger">{error}</p>

        : null;

}

export const useHasError = ( errors ) => {

    return ( name ) => {

        return Boolean( errors[name] );

    }

}

export const useInputErrorColor = ( errors ) => {

    const hasError = useHasError( errors );

    return ( name ) => {

        return hasError( name ) ? "danger" : null;

    }

}