import React from "react";

import Hero from 'react-bulma-components/lib/components/hero';
import Container from 'react-bulma-components/lib/components/container';
import Columns from "react-bulma-components/lib/components/columns";
import Box from "react-bulma-components/lib/components/box";
import Heading from 'react-bulma-components/lib/components/heading';

import { LoginLink } from "../../components/Login";
import MainWithLogin from "../../layouts/MainWithLogin";

import RegisterForm from "./components/RegisterForm";

const { Column } = Columns;

function Register() {

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
                                <RegisterForm />
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