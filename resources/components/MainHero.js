import React from "react";

import Hero from "react-bulma-components/lib/components/hero";
import Heading from "react-bulma-components/lib/components/heading";
import Container from "react-bulma-components/lib/components/container";
import Button from "react-bulma-components/lib/components/button";

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
              <Button outlined>Sign Up</Button>
              <Button outlined color="link">Sign Up</Button>
            </Button.Group>

          </Container>
        </Hero.Body>
      </Hero>
    )
}

export default MainHero;