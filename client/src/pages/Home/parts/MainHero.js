import React from "react";

import Hero from "react-bulma-components/lib/components/hero";
import Heading from "react-bulma-components/lib/components/heading";
import Container from "react-bulma-components/lib/components/container";
import Button from "react-bulma-components/lib/components/button";

import { LoginButton } from "../../../components/Login";
import { Link } from "react-router-dom";

function MainHero() {
    return (
      <Hero color="light" className="is-fullheight-with-navbar">
        <Hero.Body>
          <Container className="has-text-centered">

            <Heading>
              Bootcamp Instructor Utilities
            </Heading>

            <Heading subtitle size={5}>
              Login or sign up to get started
            </Heading>

            <Button.Group className="is-centered">
              <LoginButton color="primary" />
              <Button renderAs={Link} to="/register" outlined color="primary">Sign Up</Button>
            </Button.Group>

          </Container>
        </Hero.Body>
      </Hero>
    )
}

export default MainHero;