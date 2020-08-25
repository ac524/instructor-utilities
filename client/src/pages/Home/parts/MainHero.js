import React from "react";

import Hero from "react-bulma-components/lib/components/hero";
import Heading from "react-bulma-components/lib/components/heading";
import Container from "react-bulma-components/lib/components/container";
import Button from "react-bulma-components/lib/components/button";

import { LoginButton } from "../../../components/Login";
import { Link } from "react-router-dom";

function MainHero() {
    return (
      <Hero color="light" className="is-fullheight-with-navbar is-relative">
        <div className="is-overlay" style={{ backgroundImage: "url(/images/pexels-matilda-wormwood-4099325-edit.jpg)", opacity: .35 }}></div>
        <Hero.Body>
          <Container className="has-text-centered">
              <Heading size={1}>
                Classroom
              </Heading>

              <Heading subtitle size={4}>
                Live classroom and student management tools for instructors and TAs
              </Heading>

              <p className="my-5">
                Classroom is a management utility for instructional staff to help them
                <br />better support students in an online learning evironment.
              </p>

              <Button.Group className="is-centered">
                <LoginButton color="primary" />
                <Button renderAs={Link} to="/register" color="light">Sign Up</Button>
              </Button.Group>
          </Container>
        </Hero.Body>
      </Hero>
    )
}

export default MainHero;