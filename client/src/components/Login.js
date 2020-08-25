import React, { useState } from "react";

import Button from 'react-bulma-components/lib/components/button';
import Box from 'react-bulma-components/lib/components/box';
import Heading from 'react-bulma-components/lib/components/heading';
import { useLogout, useLogin } from "../utils/auth";
import Form from "./Form";
import { useHistory } from "react-router-dom";
import Modal, { ModalButton, ModalLink } from "./Modal";

/**
 * Open login modal button component. Requires <LoginModalProvider> as an ancenstor.
 * @param {object} props
 */
export const LoginButton = ({ children, ...props }) => {

    return <ModalButton {...props}>{children || "Login"}</ModalButton>

}

/**
 * Open login modal button component. Requires <LoginModalProvider> as an ancenstor.
 * @param {object} props
 */
export const LoginLink = ({ children, ...props }) => {

    return <ModalLink {...props}>{children || "Login"}</ModalLink>

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

    return (
        <Modal>
            <Box className="py-5">
                <Heading renderAs="h2">Login</Heading>
                <hr />
                <LoginForm />
                <p className="mt-3 has-text-grey is-size-7">Don't have an account yet? <a href="/register">Register</a></p>
            </Box>
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