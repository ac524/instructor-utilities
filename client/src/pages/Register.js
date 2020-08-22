import React, { useState } from "react";

import Hero from 'react-bulma-components/lib/components/hero';
import Container from 'react-bulma-components/lib/components/container';
import { Field, Control, Label, Input } from 'react-bulma-components/lib/components/form';
import Columns from "react-bulma-components/lib/components/columns";
import Box from "react-bulma-components/lib/components/box";
import Button from "react-bulma-components/lib/components/button";
import Heading from 'react-bulma-components/lib/components/heading';

import { LoginLink } from "../components/Login";

import api from "../utils/api";
import { useLogin } from "../utils/auth";

const { Column } = Columns;

function Register() {

    const login = useLogin();

    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ password2, setPassword2 ] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        await api.register({ name, email, password, password2 });

        // Auto Login after registration
        await login( { email, password } );

        window.location.href = "./";

    }

    return (
        <Hero color="primary">
            <Hero.Body>
                <Container>
                    <Columns>
                        <Column size="one-third">
                            <Box>
                            <Heading renderAs="h2" className="has-text-dark">Register</Heading>
                            <hr />
                            <form onSubmit={handleSubmit}>
                                <Field>
                                    <Label>Username</Label>
                                    <Control>
                                        <Input onChange={(e) => setName(e.target.value)} value={name} />
                                    </Control>
                                </Field>
                                <Field>
                                    <Label>Email</Label>
                                    <Control>
                                        <Input type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
                                    </Control>
                                </Field>
                                <Field>
                                    <Label>Password</Label>
                                    <Control>
                                        <Input onChange={(e) => setPassword(e.target.value)} value={password} />
                                    </Control>
                                </Field>
                                <Field>
                                    <Label>Repeat Password</Label>
                                    <Control>
                                        <Input onChange={(e) => setPassword2(e.target.value)} value={password2} />
                                    </Control>
                                </Field>
                                <Button color="primary mt-4" fullwidth>Signup</Button>
                                <p className="mt-3 has-text-grey is-size-7">Already have an account? <LoginLink /></p>
                            </form>
                            </Box>
                        </Column>
                    </Columns>
                </Container>
            </Hero.Body>
        </Hero>
    )

}

export default Register;