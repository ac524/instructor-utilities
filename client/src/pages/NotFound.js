
import {
    // Section,
    Container,
    Hero,
    Heading,
    Content
} from "react-bulma-components";

import { Link } from "react-router-dom";
import MainWithLogin from "layouts/MainWithLogin";
import { LoginLink } from "components/Login";

const NotFound = () => {
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