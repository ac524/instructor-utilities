import React from "react";

import Section from "react-bulma-components/lib/components/section";
import Container from "react-bulma-components/lib/components/container";
import Content from "react-bulma-components/lib/components/content";
import Heading from "react-bulma-components/lib/components/heading";

import MainWithLogin from "../layouts/MainWithLogin";

function Privacy() {
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