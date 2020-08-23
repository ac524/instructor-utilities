import React, { useState } from "react";

import Hero from 'react-bulma-components/lib/components/hero';
import Container from 'react-bulma-components/lib/components/container';
import Columns from "react-bulma-components/lib/components/columns";
import Box from "react-bulma-components/lib/components/box";
import Heading from 'react-bulma-components/lib/components/heading';

import { LoginLink } from "../components/Login";
import MainWithLogin from "../layouts/MainWithLogin";

import api from "../utils/api";
import { useLogin } from "../utils/auth";
import Form from "../components/Form";

const { Column } = Columns;

function Register() {

    const login = useLogin();

    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ password2, setPassword2 ] = useState("");
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
        }
    ];

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await api.register({ name, email, password, password2 });

            // Auto Login after registration
            await login( { email, password } );
    
            window.location.href = "./";

        } catch( err ) {

            if( err.response.data ) setErrors( { ...err.response.data, default: "An error occured, please review." } );

        }

    }

    return (
        <MainWithLogin>
            <Hero color="primary">
                <Hero.Body>
                    <Container>
                        <Columns>
                            <Column size="one-third">
                                <Box>
                                <Heading renderAs="h2" className="has-text-dark">Register</Heading>
                                <hr />
                                <Form fields={fields} errors={errors} buttonText="Sign Up" onSubmit={handleSubmit} />
                                <p className="mt-3 has-text-grey is-size-7">Already have an account? <LoginLink /></p>
                                </Box>
                            </Column>
                        </Columns>
                    </Container>
                </Hero.Body>
            </Hero>
        </MainWithLogin>
    )

}

export default Register;