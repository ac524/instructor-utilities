import React from "react";

import {
    Section,
    Container,
    Content,
    Heading
} from "react-bulma-components";

import MainWithLogin from "../layouts/MainWithLogin";

const Privacy = () => {
    return (
        <MainWithLogin>
            <Section renderAs="main">
                <Container>
                    <Content>
                        <Heading>Privacy Policy</Heading>
                        <p>To be completed.</p>
                    </Content>
                </Container>
            </Section>
        </MainWithLogin>
    )
}

export default Privacy;