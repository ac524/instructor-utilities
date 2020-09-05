import React from "react";

import {
    Hero,
    Container,
    Columns,
    Box,
    Heading
  } from "react-bulma-components";

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