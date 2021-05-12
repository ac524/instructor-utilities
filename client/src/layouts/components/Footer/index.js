import { Link } from "react-router-dom";

import {
    Section,
    Container,
    Columns,
    Heading
} from "react-bulma-components";

import "./style.sass";
import WebLink from "components/WebLink";
import { useIsAuthenticated } from "utils/auth";

const { Column } = Columns;

const Footer = () => {

    const isAuth = useIsAuthenticated();

    return (
        <Section renderAs="footer" className="layout-footer has-background-dark has-text-light">
            <Container>
                <Columns>
                    <Column>
                        <Heading renderAs="h3">Links</Heading>
                        { isAuth ? null : <p><Link to="/register">Register</Link></p> }
                        <p><Link to="/devs">Meet the devs</Link></p>
                        <p><Link to="/privacy">Privacy</Link></p>
                    </Column>
                    <Column className="has-text-right-tablet">
                        <Heading renderAs="h3">Built On</Heading>
                        <p><WebLink href="https://reactjs.org">React</WebLink></p>
                        <p><WebLink href="https://bulma.io">Bulma</WebLink></p>
                        <p><WebLink href="https://nodejs.org">Node.js</WebLink></p>
                        <p><WebLink href="https://www.mongodb.com">Mongo</WebLink></p>
                    </Column>
                </Columns>
            </Container>
        </Section>
    );

}

export default Footer;