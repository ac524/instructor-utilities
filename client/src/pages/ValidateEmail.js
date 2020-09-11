import React, { useState } from "react";

import {
    Hero,
    Heading,
    Container,
    Form,
    Columns,
    Button
} from "react-bulma-components";

import Icon from "../components/Icon";
import MainWithLogin from "../layouts/MainWithLogin";

const { Input } = Form;
const { Column } = Columns;

const ResendForm = () => {

    const [ email, setEmail ] = useState();

    return (
        <Columns>
            <Column size="two-thirds">
                <Input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email"  />
            </Column>
            <Column>
                <Button color="light" outlined>
                    <Icon icon="paper-plane" />
                    <span>Resend</span>
                </Button>
            </Column>
        </Columns>
    )

}

const ValidateEmail = () => {

    return (
        <MainWithLogin>
            <Hero color="primary" className="is-fullheight-with-navbar is-relative is-bold">
                <Hero.Body>
                    <Container>
                        <Heading>Email Validation</Heading>
                        <Heading subtitle>Hmmmm, you're token seems to have expired.</Heading>
                        <Columns>
                            <Column size="half">
                                <ResendForm />
                            </Column>
                        </Columns>
                    </Container>
                </Hero.Body>
            </Hero>
        </MainWithLogin>
    );

}

export default ValidateEmail;