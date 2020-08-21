import React, { createContext, useContext, useState } from "react";

import Modal from 'react-bulma-components/lib/components/modal';
import Button from 'react-bulma-components/lib/components/button';
import Section from 'react-bulma-components/lib/components/section';

const LoginModalContext = createContext({
    isActive: false,
    open: () => undefined,
    close: () => undefined
});

const { Provider } = LoginModalContext;

export const LoginModalProvider = ({children, isActive = false}) => {

    const [ modalState, setModalState ] = useState({
        isActive,
        open: () => setModalState( { ...modalState, isActive: true } ),
        close: () => setModalState( { ...modalState, isActive: false } )
    });

    return (
        <Provider value={modalState}>
            {children}
        </Provider>
    )

}


export const LoginButton = ({ children, ...props }) => {
    const { open } = useContext( LoginModalContext );

    return <Button onClick={open} {...props}>{children || "Login"}</Button>
}

export const LoginModal = ( ) => {
    const { isActive, close } = useContext( LoginModalContext );

    return (
        <Modal show={isActive} onClose={close}>
            <Modal.Content>
            <Section style={{ backgroundColor: 'white' }}>
                Click on the {'"X"'} button on the top-right button to close the Modal (pass closeOnEsc=false to the modal to avoid closing it with the keyboard)
            </Section>
            </Modal.Content>
        </Modal>
    )

}