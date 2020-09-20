import React, { useState } from "react";

import api from "utils/api";
import { useLogin } from "utils/auth";
import Form, { createValidator } from "components/Form";
import { useHistory } from "react-router-dom";

const validateRegistrationData = createValidator({
    validators: {
        name: ({ name }) => Boolean(name) || "Your name is required",
        email: ({ email }) => Boolean(email) || "Email is required",
        password: ({ password, password2 }) => {

            const errors = [];

            if( password ) {

                // TODO stronger password validation for both client and server.
                if( password.length < 6 ) errors.push(["password", "Password must be at least 6 characters"] );

            } else {
                errors.push( ["password", "Password is required"] );
            }

            if( !password2 ) errors.push( ["password2", "Confirm password is required"] );

            if( !errors.length ) {
                
                if( password !== password2 ) errors.push( ["password", "Passwords must match"], ["password2", "Passwords must match"] );

            }

            if( errors.length ) return Object.fromEntries( errors );

        },
        roomname: ({ roomname }) => Boolean(roomname) || "Room name is required",
    }
});

const RegisterForm = () => {

    const login = useLogin();
    const history = useHistory();

    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ password2, setPassword2 ] = useState("");
    const [ roomname, setRoomName ] = useState("");
    const [ errors, setErrors ] = useState({});

    const fields = [
        {
            label: "Your Name",
            onChange: (e) => setName(e.target.value),
            value: name,
            name: "name"
        },
        {
            label: "Email",
            onChange: (e) => setEmail(e.target.value),
            value: email,
            type:"email",
            name: "email"
        },
        {
            label: "Password",
            onChange: (e) => setPassword(e.target.value),
            value: password,
            type:"password",
            name: "password"
        },
        {
            label: "Confirm Password",
            onChange: (e) => setPassword2(e.target.value),
            value: password2,
            type:"password",
            name: "password2"
        },
        {
            label: "Classroom Name",
            onChange: (e) => setRoomName(e.target.value),
            value: roomname,
            type:"text",
            name: "roomname"
        }
    ];

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const [ data, errors, hasErrors ] = validateRegistrationData({ name, email, password, password2, roomname });

            if( hasErrors ) {
                setErrors(errors);
                return
            }

            setErrors({});

            await api.register(data);

            // Auto Login after registration
            await login( { email, password } );
            
            history.push("/");

        } catch( err ) {

            if( err.response.data ) setErrors( { ...err.response.data, default: "An error occured, please review." } );

        }

    }

    return <Form flat fields={fields} errors={errors} buttonText="Sign Up" onSubmit={handleSubmit} />;

}

export default RegisterForm;