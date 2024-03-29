import { createContext, useContext } from "react";

import { Message } from "react-bulma-components";

const ErrorContext = createContext();

const { Provider } = ErrorContext;

export const ErrorProvider = ( props ) => {
    return <Provider {...props} />
}

export const Error = ( { name, type = "help" } ) => {

    const { [name]: error } = useContext( ErrorContext );

    const types = {
        help: () => <p className="help is-danger">{error}</p>,
        message: () => <Message color="danger"><Message.Body className="py-3">{error}</Message.Body></Message>
    }

    return error

        ? ( types[type]() )

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