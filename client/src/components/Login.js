import React, { createContext, useContext, useReducer, useState } from "react";

import Modal from 'react-bulma-components/lib/components/modal';
import Button from 'react-bulma-components/lib/components/button';
import Box from 'react-bulma-components/lib/components/box';
import Heading from 'react-bulma-components/lib/components/heading';
import { useLogout, useLogin } from "../utils/auth";
import Form from "./Form";
import { useHistory } from "react-router-dom";

// Define a new context
const LoginModalContext = createContext(false);

// Deconstruct the provider for ease of use in JSX
const { Provider } = LoginModalContext;

// Create the reducer actions for managing our context state.
const loginReducer = ( state, action ) => {

    const actions = {
        // Set the state to true.
        open: () => true,
        // Set the state to false.
        close: () => false
    }

    return actions.hasOwnProperty(action)

        ? actions[action]()

        : state;

}

/**
 * Login content provider component.
 * @param {object} props 
 */
export const LoginModalProvider = ({children, isActive = false}) => {

    // Create the reducer state.
    const [ loginState, loginDispatch ] = useReducer( loginReducer, isActive );

    return (
        <Provider value={{ loginState, loginDispatch }}>
            {children}
        </Provider>
    )

}

/**
 * Open login modal button component. Requires <LoginModalProvider> as an ancenstor.
 * @param {object} props
 */
export const LoginButton = ({ children, ...props }) => {

    // Consume the login context to fetch the live state.
    const { loginDispatch } = useContext( LoginModalContext );

    return <Button onClick={() => loginDispatch("open")} {...props}>{children || "Login"}</Button>

}

/**
 * Open login modal button component. Requires <LoginModalProvider> as an ancenstor.
 * @param {object} props
 */
export const LoginLink = ({ children, ...props }) => {

    // Consume the login context to fetch the live state.
    const { loginDispatch } = useContext( LoginModalContext );

    return <a onClick={() => loginDispatch("open")} {...props}>{children || "Login"}</a>

}

/**
 * Open login modal button component. Requires <LoginModalProvider> as an ancenstor.
 * @param {object} props
 */
export const LogoutButton = ({ children, ...props }) => {

    // Consume the login context to fetch the live state.
    const logout = useLogout();

    return <Button onClick={logout} {...props}>{children || "Logout"}</Button>

}

/**
 * Open login modal button component. Requires <LoginModalProvider> as an ancenstor.
 * @param {object} props
 */
export const LogoutLink = ({ children, ...props }) => {

    // Consume the login context to fetch the live state.
    const logout = useLogout();

    return <a onClick={logout} {...props}>{children || "Login"}</a>

}


/**
 * Login modal component. Requires <LoginModalProvider> as an ancenstor.
 */
export const LoginModal = () => {

    // Consume the login context to fetch the live state.
    const { loginState, loginDispatch } = useContext( LoginModalContext );

    return (
        <Modal show={loginState} onClose={() => loginDispatch("close")} closeOnBlur={true}>
            <Modal.Content>
                <Box className="py-5">
                    <Heading renderAs="h2">Login</Heading>
                    <hr />
                    <LoginForm afterLogin={() => loginDispatch("close")} />
                    <p className="mt-3 has-text-grey is-size-7">Don't have an account yet? <a href="/register">Register</a></p>
                </Box>
            </Modal.Content>
        </Modal>
    )

}

export const LoginForm = ( { afterLogin } ) => {

    const login = useLogin();
    const history = useHistory();

    // Form state.
    const [ email, setEmail ] = useState( "" );
    const [ password, setPassword ] = useState( "" );
    const [ errors, setErrors ] = useState({});

    // Login form fields configuration.
    const fields = [
        {
            label: "Email",
            placeholder: "Login Email",
            name: "email",
            type: "email",
            value: email,
            onChange: (e) => setEmail(e.target.value)
        },
        {
            label: "Password",
            placeholder: "Password",
            name: "password",
            type: "password",
            value: password,
            onChange: (e) => setPassword(e.target.value)
        }
    ];

    // Handle login submission.
    const handleSubmit = async (e) => {

        e.preventDefault();

        const formErrors = [];

        if( !email ) formErrors.push(["email", "Email is required"]);

        if( !password ) formErrors.push(["password", "Password is required"]);

        if( formErrors.length ) {

            formErrors.length > 1
            
                ? formErrors.push(["default", "You're not even trying!"])

                : formErrors.push(["default", "Almost there!"]);

            setErrors( Object.fromEntries(formErrors) );
            return;
        }

        setErrors({});

        try {

            await login( { email, password } );

            if( afterLogin ) afterLogin();

            history.push("/");

        } catch( err ) {

            if( err.response.data ) setErrors({ default: "Nope! Try again.", ...err.response.data });

        }
        
    };

    return <Form fields={fields} errors={errors} onSubmit={handleSubmit} buttonText="Login" />;

};