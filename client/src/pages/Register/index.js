import React from "react";

import {
    Hero,
    Container,
    Columns,
    Box,
    Heading
  } from "react-bulma-components";
import Fade from "animations/Fade";

import { LoginLink } from "components/Login";
import MainWithLogin from "layouts/MainWithLogin";

import RegisterForm from "./components/RegisterForm";

const { Column } = Columns;

const Register = () => {

    const formBoxSizes = {
        tablet: {size: 'two-thirds'},
        desktop: {size: 'three-fifths'},
        widescreen: {size: 'half'}
    };

    return (
        <MainWithLogin>
            <Hero color="primary" className="is-fullheight-with-navbar is-bold">
                <Hero.Body>
                    <Container>
                        <Columns>
                            <Column {...formBoxSizes}>
                                <Heading>Classroom Registration</Heading>
                                <p className="mb-5">
                                    Create a new account and classroom with the form below to get started. From there you can start inviting TA's, adding students and kicking ass at managing student success and support!
                                </p>
                                <Fade>
                                    <Box>
                                        <Heading renderAs="h2" className="has-text-dark">Become an Instructor</Heading>
                                        <hr />
                                        <RegisterForm />
                                        <p className="mt-3 has-text-grey is-size-7">Already have an account? <LoginLink /></p>
                                    </Box>
                                </Fade>
                            </Column>
                        </Columns>
                    </Container>
                </Hero.Body>
            </Hero>
        </MainWithLogin>
    )

}

export default Register;