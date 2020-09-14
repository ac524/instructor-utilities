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
import { LoginForm } from "../components/Login";
import Pulse from "../components/Pulse";
import MainWithLogin from "../layouts/MainWithLogin";
import api from "../utils/api";
import { useAuthorizedUser, useLogin } from "../utils/auth";

const { Column } = Columns;

const columnSizes = {
    tablet: {size: 'two-thirds'},
    desktop: {size: 'three-fifths'},
    widescreen: {size: 'half'}
};

const RegstrationContent = ({ token, email }) => {

    const [ name, setName ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ password2, setPassword2 ] = useState("");
    const [ errors, setErrors ] = useState({});
    const login = useLogin();

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

    const handleSubmit = async e => {

        e.preventDefault();

        try {

            await api.registerInvite( token, { name, password, password2 } );

            await login( { email, password } );

        } catch(err) {

            if( err.response && err.response.data ) setErrors( err.response.data );

        }

    }

    return (
        <Columns>
            <Column {...columnSizes}>
                <p className="mb-5">
                    <strong>Thanks for accepting the invite!</strong><br />
                    Please create an account to complete the process and join your team.
                </p>
                <Box>
                    <Heading renderAs="h2" className="has-text-dark">Create an account</Heading>
                    <hr />
                    <Form fields={fields} errors={errors} buttonText="Join Classroom" onSubmit={handleSubmit} />
                </Box>
            </Column>
        </Columns>
    )

}

const LoginContent = () => {
    return (
        <Columns>
            <Column {...columnSizes}>
                <p className="mb-5">
                    <strong>Thanks for accepting the invite!</strong><br />
                    Please log into you account to complete the process and join your new team.
                </p>
                <Box>
                    <Heading renderAs="h2" className="has-text-dark">Login</Heading>
                    <hr />
                    <LoginForm />
                </Box>
            </Column>
        </Columns>
    )
}

const Invite = () => {

    const user = useAuthorizedUser();
    const { token } = useParams();
    const [ error, setError ] = useState();
    const [ accepted, setAccepted ] = useState(false);
    const [ email, setEmail ] = useState();
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {   

        const checkInviteUser = async () => {

            console.log( "checkInviteUser" );

            try {

                const res = await api.getInviteEmail( token );

                setEmail( res.data );

                if( res.data.hasUser && user ) {

                    await api.acceptInvite( token );

                    setAccepted(true);

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

    }, [token, user, setEmail, setIsLoading, setError, setAccepted]);

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
                                
                                    ? (
                                        <div>
                                            <p className="mb-4">Congratulations, invitation accepted!</p>
                                            <Button to="/" color="light" renderAs={Link} outlined>
                                                <span>Go to class</span>
                                                <Icon icon={['far','arrow-alt-circle-right']} />
                                            </Button>
                                        </div>
                                    )
    
                                    : (
                                        email.hasUser
    
                                        ? ( 
                                            <LoginContent />
                                        )
        
                                        : <RegstrationContent token={token} email={email.email} />
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