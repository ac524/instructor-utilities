import {
  Hero,
  Heading,
  Container,
  Button
} from "react-bulma-components";

import { Link } from "react-router-dom";
import Fade from "animations/Fade";
import Icon from "components/Icon";

const MainHero = () => {
    return (
      <Hero color="dark" className="is-fullheight-with-navbar is-relative">
        <div className="is-overlay" style={{ backgroundImage: "url(/images/pexels-matilda-wormwood-4099325-edit.jpg)", opacity: .35, backgroundSize: "cover" }}></div>
        <Hero.Body>
          <Container>
              <Fade>
                <Heading size={1} className="is-flex" style={{alignItems:"center"}}>
                  <img src="/images/logo-white.png" style={{width: "60px", height: "auto"}} alt="Classroom Logo" />
                  <span>Classroom</span>
                </Heading>

                <Heading subtitle size={3}>
                  Student management tools for instructional staff
                </Heading>

                <p className="my-5">
                  Classroom is a management utility helping instructional staff
                  <br />better support students in an online learning evironment.
                </p>

                <Button.Group>
                  <Button renderAs={Link} to="/register" color="primary" className="has-shadow">
                    Get started as an instructor
                    <Icon className="ml-2" icon={["far", "arrow-alt-circle-right"]} />
                  </Button>
                </Button.Group>
              </Fade>
          </Container>
        </Hero.Body>
      </Hero>
    )
}

export default MainHero;