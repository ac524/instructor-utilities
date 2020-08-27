import React from "react";

// import Section from "react-bulma-components/lib/components/section";
import Hero from "react-bulma-components/lib/components/hero";
import Container from "react-bulma-components/lib/components/container";
import Heading from "react-bulma-components/lib/components/heading";
import Content from "react-bulma-components/lib/components/content";
import { Link } from "react-router-dom";
import MainWithLogin from "../layouts/MainWithLogin";
import { LoginLink } from "components/Login";

function NotFound() {
    return (
        <MainWithLogin>
            <Hero className="is-fullheight-with-navbar">
                <Hero.Body>
                    <Container>
                        <Content>
                            <Heading>Hmmm, this doesn't seem quite right</Heading>
                            <p>Sorry, but the thing you were looking for couldn't be found. Try <LoginLink>Logging in</LoginLink> or <Link to="/">Return Home &raquo;</Link></p>
                        </Content>
                    </Container>
                </Hero.Body>
            </Hero>
        </MainWithLogin>
    );
}

export default NotFound;