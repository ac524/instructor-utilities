import React, { createContext, useContext, useReducer, useState } from "react";

import Modal from 'react-bulma-components/lib/components/modal';
import Button from 'react-bulma-components/lib/components/button';
import Box from 'react-bulma-components/lib/components/box';
import Heading from 'react-bulma-components/lib/components/heading';
import { Field, Control, Label, Input } from 'react-bulma-components/lib/components/form';
import { useLogout, useLogin } from "../utils/auth";

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

    const [ email, setEmail ] = useState( "" );
    const [ password, setPassword ] = useState( "" );

    const handleSubmit = async (e) => {

        e.preventDefault();

        await login( { email, password } );

        loginDispatch("close");
        
    };

    return (
        <Modal show={loginState} onClose={() => loginDispatch("close")}>
            <Modal.Content>
                <Box className="py-5">
                    <Heading renderAs="h2">Login</Heading>
                    <form onSubmit={handleSubmit}>
                        <Field>
                            <Label>Email</Label>
                            <Control>
                                <Input value={email} onChange={(e) => setEmail(e.target.value) } />
                            </Control>
                        </Field>
                        <Field>
                            <Label>Password</Label>
                            <Control>
                                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value) } />
                            </Control>
                        </Field>
                        <Button color="primary">Login</Button>
                        <p className="mt-3 has-text-grey is-size-7">Don't have an account yet? <a href="/register">Register</a></p>
                    </form>
                </Box>
            </Modal.Content>
        </Modal>
    )

}