import React from "react";

import {
    Hero,
    Container,
    Columns,
    Box,
    Heading
  } from "react-bulma-components";
import Fade from "../../animations/Fade";

import { LoginLink } from "../../components/Login";
import MainWithLogin from "../../layouts/MainWithLogin";

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
                                <Fade>
                                    <Box>
                                        <Heading renderAs="h2" className="has-text-dark">Register</Heading>
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