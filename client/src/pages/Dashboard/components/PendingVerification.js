import React, { useState } from "react";

import {
    Heading,
    Container,
    Content,
    Button
} from "react-bulma-components";

import Icon from "components/Icon";
import api from "utils/api";

import { useAuthorizedUser } from "utils/auth";

const PendingVerification = () => {
    
    const user = useAuthorizedUser();
    const [ isResent, setIsResent ] = useState(false);

    const resendVerification = async () => {

        try {

            await api.resendValidation( { email: user.email } );
            setIsResent(true);

        } catch( err ) {

            console.log(err);

        }

    }

    return (
        <div className="is-overlay has-background-primary has-text-white is-flex" style={{ opacity: .9, alignItems: "center", zIndex: 100, position: "fixed" }}>
            <Container className="px-4">
                <Heading renderAs="p" className="has-text-inherit is-flex" size={1} style={{alignItems:"center"}}>
                    <img src="/images/logo-white.png" style={{width: "60px", height: "auto"}} alt="Classroom Logo" />
                    <span>Classroom</span>
                </Heading>
                <p className="is-size-6">Hi, {user.name}</p>
                <Heading className="has-text-inherit">Email Validation Required</Heading>
                <Heading className="has-text-inherit" renderAs="p" subtitle>We sent you an email. Please click the provided link to verify your email.</Heading>
                <Content>
                    <p className="is-size-7">Didn't get an email?</p>
                    <Button color="light" outlined onClick={resendVerification}>
                        <Icon icon={isResent ? "check" : "paper-plane"} />
                        <span>{ isResent ? "Verification Resent" : "Resend Verification Link" }</span>
                    </Button>
                </Content>
            </Container>
        </div>
    )

}

export default PendingVerification;