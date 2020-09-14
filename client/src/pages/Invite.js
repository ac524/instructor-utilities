import React, { useEffect, useState } from "react";

import {
    Hero,
    Heading,
    Container,
    Columns,
    Box,
    Button
} from "react-bulma-components";

import { Link, useParams } from "react-router-dom";
import Form from "../components/Form";

import Icon from "../components/Icon";
import { LoginButton } from "../components/Login";
import Pulse from "../components/Pulse";
import MainWithLogin from "../layouts/MainWithLogin";
import api from "../utils/api";
import { useIsAuthenticated } from "../utils/auth";

const { Column } = Columns;

const RegstrationForm = () => {

    const [ name, setName ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ password2, setPassword2 ] = useState("");

    const fields = [
        {
            label: "Name",
            placeholder: "Your name",
            name: "name",
            type: "text",
            value: name,
            onChange: e => setName(e.target.value)
        },
        {
            label: "Password",
            placeholder: "Password",
            onChange: e => setPassword(e.target.value),
            value: password,
            type:"password",
            name: "password"
        },
        {
            label: "Confirm Password",
            placeholder: "Password",
            onChange: e => setPassword2(e.target.value),
            value: password2,
            type:"password",
            name: "password2"
        }
    ];

    const formBoxSizes = {
        tablet: {size: 'two-thirds'},
        desktop: {size: 'three-fifths'},
        widescreen: {size: 'half'}
    };

    return (
        <Columns>
            <Column {...formBoxSizes}>
                <p className="mb-5">
                    <strong>Thanks for accepting the invite!</strong><br />
                    Please create an account complete the process and join your team.
                </p>
                <Box>
                    <Heading renderAs="h2" className="has-text-dark">Create an account</Heading>
                    <hr />
                    <Form fields={fields} buttonText="Join Classroom" />
                </Box>
            </Column>
        </Columns>
    )

}

const Invite = () => {

    const isAuth = useIsAuthenticated();
    const { token } = useParams();
    const [ error, setError ] = useState();
    const [ accepted, setAccepted ] = useState(false);
    const [ email, setEmail ] = useState();
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {   

        const checkInviteUser = async () => {

            try {

                const res = await api.inviteEmail( token );

                setEmail( res.data );

                if( res.data.hasUser && isAuth ) {

                    const res = await api.acceptInvite( token );

                }

            } catch(err) {

                console.log( err );
    
                if( err.response && err.response.data.default ) setError( err.response.data.default );

            }


            setIsLoading(false);

        }

        checkInviteUser();

        // const acceptInvite = async () => {

        //     try {
    
        //         const res = await api.acceptInvite( token );
    
        //         setInvite( res.data );
    
        //     } catch(err) {

        //         console.log( err );
    
        //         if( err.response && err.response.data.default ) setError( err.response.data.default );
            
        //     }
    
        //     setIsLoading(false);

        // }

        // acceptInvite();

    }, [token, isAuth, setEmail, setIsLoading, setError]);

    return (
        <MainWithLogin>
            <Hero color="primary" className="is-fullheight-with-navbar is-relative is-bold">
                <Hero.Body>
                    <Container>
                        <Heading>Classroom Invitation</Heading>
                        {
                            isLoading

                            ? <Pulse color="#FFFFFF" className="m-0" />

                            : (
                                error

                                ? <p>Sorry! {error}</p>

                                : (
                                    accepted
                                
                                    ? <p>Invitation Accepted!</p>
    
                                    : (
                                        email.hasUser
    
                                        ? ( 
                                            <p>Sign in form</p>
                                        )
        
                                        : <RegstrationForm />
                                    )
                                )
                            )
                        }
                    </Container>
                </Hero.Body>
            </Hero>
        </MainWithLogin>
    );

}

export default Invite;