import React, { useState } from "react";

import {
    Button,
    Box,
    Heading
} from "react-bulma-components";

import { useLogout, useLogin } from "utils/auth";
import Form, { createValidator } from "./Form";
import { useHistory } from "react-router-dom";
import Modal, { ModalButton, ModalLink } from "./Modal";

const validateLoginData = createValidator({
    validators: {
        email: ({ email }) => Boolean(email) || "Email is required",
        password: ({ password }) => Boolean(password) || "Password is required",
        default: ( data, errors ) => {

            const errorCount = Object.keys(errors).length;

            if( !errorCount ) return true;

            return errorCount > 1 ? "You're not even trying!" : "Almost there!";

        }
    }
});

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

export const LoginForm = ( { afterLogin, redirect = true, email: emailStart = "" } ) => {

    const login = useLogin();
    const history = useHistory();

    // Form state.
    const [ email, setEmail ] = useState( emailStart );
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
            placeholder: "Login Password",
            name: "password",
            type: "password",
            value: password,
            onChange: (e) => setPassword(e.target.value)
        }
    ];

    // Handle login submission.
    const handleSubmit = async (e) => {

        e.preventDefault();

        const [ data, errors, hasErrors ] = validateLoginData({ email, password });

        if( hasErrors ) {
            setErrors( errors );
            return;
        }

        setErrors({});

        try {

            await login( data );

            if( afterLogin ) afterLogin();

            if(redirect) history.push("/");

        } catch( err ) {

            if( err.response && err.response.data ) setErrors({ default: "Nope! Try again.", ...err.response.data });

        }
        
    };

    return <Form flat fields={fields} errors={errors} onSubmit={handleSubmit} buttonText="Login" />;

};