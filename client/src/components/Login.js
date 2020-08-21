import React, { createContext, useContext, useReducer } from "react";

import Modal from 'react-bulma-components/lib/components/modal';
import Button from 'react-bulma-components/lib/components/button';
import Section from 'react-bulma-components/lib/components/section';

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
 * Login modal component. Requires <LoginModalProvider> as an ancenstor.
 */
export const LoginModal = () => {

    // Consume the login context to fetch the live state.
    const { loginState, loginDispatch } = useContext( LoginModalContext );

    return (
        <Modal show={loginState} onClose={() => loginDispatch("close")}>
            <Modal.Content>
            <Section style={{ backgroundColor: 'white' }}>
                Click on the {'"X"'} button on the top-right button to close the Modal (pass closeOnEsc=false to the modal to avoid closing it with the keyboard)
            </Section>
            </Modal.Content>
        </Modal>
    )

}