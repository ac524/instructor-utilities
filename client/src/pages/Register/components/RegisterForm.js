import React, { useState } from "react";

import api from "../../../utils/api";
import { useLogin } from "../../../utils/auth";
import Form from "../../../components/Form";
import { useHistory } from "react-router-dom";

function RegisterForm() {

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
            label: "Username",
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

            await api.register({ name, email, password, password2, roomname });

            // Auto Login after registration
            await login( { email, password } );
            
            history.push("/");

        } catch( err ) {

            if( err.response.data ) setErrors( { ...err.response.data, default: "An error occured, please review." } );

        }

    }

    return <Form fields={fields} errors={errors} buttonText="Sign Up" onSubmit={handleSubmit} />;

}

export default RegisterForm;