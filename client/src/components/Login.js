import React, { createContext, useContext, useReducer, useState, useEffect } from "react";

import Modal from 'react-bulma-components/lib/components/modal';
import Button from 'react-bulma-components/lib/components/button';
import Box from 'react-bulma-components/lib/components/box';
import Heading from 'react-bulma-components/lib/components/heading';
import { useLogout, useLogin } from "../utils/auth";
import Form from "./Form";

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
 * Login modal component. Requires <LoginModalProvider> as an ancenstor.
 */
export const LoginModal = () => {

    // Consume the login context to fetch the live state.
    const { loginState, loginDispatch } = useContext( LoginModalContext );
    const login = useLogin();

    // Form state.
    const [ email, setEmail ] = useState( "" );
    const [ password, setPassword ] = useState( "" );
    const [ errors, setErrors ] = useState({});

    // Reset inputs and error when the modal closes.
    useEffect(() => {

        if( !loginState ) {
            setEmail("");
            setPassword("");
            setErrors({});
        }

    }, [loginState]);

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

        if( !email && !password ) {
            setErrors({
                default: "You're not even trying!",
                email: "Email is required",
                password: "Password is required"
            });
            return;
        }

        setErrors({});

        try {

            await login( { email, password } );

            loginDispatch("close");

            window.location.href = "./";

        } catch( err ) {

            if( err.response.data ) setErrors({ default: "Nope! Try again.", ...err.response.data });

        }
        
    };

    return (
        <Modal show={loginState} onClose={() => loginDispatch("close")} closeOnBlur={true}>
            <Modal.Content>
                <Box className="py-5">
                    <Heading renderAs="h2">Login</Heading>
                    <hr />
                    <Form fields={fields} errors={errors} onSubmit={handleSubmit} buttonText="Login" />
                    <p className="mt-3 has-text-grey is-size-7">Don't have an account yet? <a href="/register">Register</a></p>
                </Box>
            </Modal.Content>
        </Modal>
    )

}