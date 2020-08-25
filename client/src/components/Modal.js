import React, { useContext, useState, createContext } from "react";

import BulmaModal from 'react-bulma-components/lib/components/modal';

import Button from 'react-bulma-components/lib/components/button';

// Define a new context
const ModalContext = createContext(false);

// Deconstruct the provider for ease of use in JSX
const { Provider } = ModalContext;

export const useModalContext = () => {

    return useContext( ModalContext );
    
}

/**
 * Modal provider component.
 * @param {object} props 
 */
export const ModalProvider = ({children, isActive = false}) => {

    // Create the reducer state.
    const modalState = useState( isActive );

    return (
        <Provider value={modalState}>
            {children}
        </Provider>
    )

}

/**
 * Open modal button component. Requires <ModalProvider> as an ancenstor.
 * @param {object} props
 */
export const ModalButton = ({ children, ...props }) => {

    // Consume the login context to fetch the live state.
    const [ ,setIsActive ] = useContext( ModalContext );

    return <Button onClick={() => setIsActive(true)} {...props}>{children || "Launch Modal"}</Button>

}

/**
 * Open modal link component. Requires <ModalProvider> as an ancenstor.
 * @param {object} props
 */
export const ModalLink = ({ children, ...props }) => {

    // Consume the login context to fetch the live state.
    const [ ,setIsActive ] = useContext( ModalContext );

    return <a role="button" onClick={() => setIsActive(true)} {...props}>{children || "Launch Modal"}</a>

}

function Modal( { children, ...props } ) {

    const [ isActive, setIsActive ] = useContext( ModalContext );

    return (
        <BulmaModal show={isActive} onClose={() => setIsActive(false)} closeOnBlur={true} {...props}>
            <BulmaModal.Content>
                {children}
            </BulmaModal.Content>
        </BulmaModal>
    )

}

export default Modal;