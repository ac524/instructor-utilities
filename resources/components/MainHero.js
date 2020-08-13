import React from "react";

import Hero from 'react-bulma-components/lib/components/hero';
import Heading from 'react-bulma-components/lib/components/heading';
import Section from 'react-bulma-components/lib/components/section';
import Container from 'react-bulma-components/lib/components/container';

const center = { textAlign: 'center' };

function MainHero() {
    return (
        <Section>
        <Hero color="light" >
          <Hero.Body>
            <Container>
              <Heading style={center}>
              Bootcamp Instructor Utilities
              </Heading>

              {/* Line */}

              <Heading subtitle size={5} style={center}>
              Login or sign up to get started
              </Heading>

                <div className="buttons is-centered">
                    <a className="button is-outlined">
                        Sign Up
                    </a>
                    <a className="button is-link is-outlined">
                        Login
                    </a>
                </div>

            </Container>
          </Hero.Body>
        </Hero>
      </Section>
    )
}

export default MainHero;