import { useEffect, useState } from "react";

import {
    Hero,
    Heading,
    Container,
    Form,
    Columns,
    Button
} from "react-bulma-components";
import { Link, useParams } from "react-router-dom";

import Icon from "components/Icon";
import { LoginButton } from "components/Login";
import Pulse from "components/Pulse";
import MainWithLogin from "layouts/MainWithLogin";
import api from "utils/api";
import { useIsAuthenticated } from "utils/auth";
import { useStoreDispatch, getStoreAction as gsa } from "store";

const { Input } = Form;
const { Column } = Columns;

const ResendForm = () => {

    const defaultBtnState = {
        icon: "paper-plane",
        text: "Resend",
        props: {
            color: "light",
            outlined: true
        }
    };

    const [ email, setEmail ] = useState();
    const [ buttonState, setButtonState ] = useState(defaultBtnState);

    const handleEmailChange = e => {
        setEmail(e.target.value);
        if( buttonState !== defaultBtnState ) setButtonState( defaultBtnState );
    }

    const resend = async () => {

        try {

            await api.resendValidation( { email } );

            setButtonState({
                icon: "check",
                text: "Validation Resent",
                props: {
                    color: "success",
                    className: "is-light"
                }
            })

        } catch( err ) {

            setButtonState({
                icon: "ban",
                text: err.response.data.default || "Resend Failed",
                props: {
                    color: "danger",
                    className: "is-light"
                }
            });

        }

    }

    return (
        <Columns>
            <Column size="two-thirds">
                <Input type="email" value={email} onChange={handleEmailChange} placeholder="Enter your email"  />
            </Column>
            <Column>
                <Button {...buttonState.props} onClick={resend}>
                    <Icon icon={buttonState.icon} />
                    <span>{buttonState.text}</span>
                </Button>
            </Column>
        </Columns>
    )

}

const VerifiedContent = () => {

    const isAuth = useIsAuthenticated();

    return (
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
    );
}

const UnverifiedContent = () => {
    return (
        <div>
            <Heading subtitle>Hmmmm, you're token seems to have expired.</Heading>
            <Columns>
                <Column size="half">
                    <ResendForm />
                </Column>
            </Columns>
        </div>
    )
}

const ValidateEmail = () => {

    const { token } = useParams();
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

                            : ( isVerified ? <VerifiedContent /> : <UnverifiedContent /> )
                        }
                    </Container>
                </Hero.Body>
            </Hero>
        </MainWithLogin>
    );

}

export default ValidateEmail;