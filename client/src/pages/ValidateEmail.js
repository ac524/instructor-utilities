import React, { useEffect, useState } from "react";

import {
    Hero,
    Heading,
    Container,
    Form,
    Columns,
    Button
} from "react-bulma-components";
import { Link, useParams } from "react-router-dom";

import Icon from "../components/Icon";
import { LoginButton } from "../components/Login";
import Pulse from "../components/Pulse";
import MainWithLogin from "../layouts/MainWithLogin";
import api from "../utils/api";
import { useIsAuthenticated } from "../utils/auth";

const { Input } = Form;
const { Column } = Columns;

const ResendForm = () => {

    const [ email, setEmail ] = useState();

    return (
        <Columns>
            <Column size="two-thirds">
                <Input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email"  />
            </Column>
            <Column>
                <Button color="light" outlined>
                    <Icon icon="paper-plane" />
                    <span>Resend</span>
                </Button>
            </Column>
        </Columns>
    )

}

const ValidateEmail = () => {

    const { token } = useParams();
    const isAuth = useIsAuthenticated();
    const [ isVerified, setIsVerified ] = useState( false );
    const [ isLoading, setIsLoading ] = useState( true );

    useEffect(() => {

        const validateToken = async () => {

            try {

                await api.validate( token );

                setIsVerified( true );

            } catch( err ) {
                // No action required
            }

            setIsLoading( false );

        }

        validateToken();

    }, [ token, setIsLoading, setIsVerified ]);

    return (
        <MainWithLogin>
            <Hero color="primary" className="is-fullheight-with-navbar is-relative is-bold">
                <Hero.Body>
                    <Container>
                        <Heading>Email Validation</Heading>
                        {
                            isLoading

                            ? <Pulse className="m-0" color="#FFFFFF" />

                            : (
                                isVerified

                                ? (
                                    <div>
                                        <Heading subtitle><strong>Email verified.</strong> You're all set!</Heading>
                                        {
                                            isAuth

                                            ? (
                                                <Button to="/" color="light" renderAs={Link} outlined>
                                                    <span>Go to class</span>
                                                    <Icon icon={['far','arrow-alt-circle-right']} />
                                                </Button>
                                            )
                                            
                                            : <LoginButton color="light" outlined />
                                        }
                                    </div>
                                )

                                : (
                                    <div>
                                        <Heading subtitle>Hmmmm, you're token seems to have expired.</Heading>
                                        <Columns>
                                            <Column size="half">
                                                <ResendForm />
                                            </Column>
                                        </Columns>
                                    </div>
                                )
                            )
                        }
                    </Container>
                </Hero.Body>
            </Hero>
        </MainWithLogin>
    );

}

export default ValidateEmail;