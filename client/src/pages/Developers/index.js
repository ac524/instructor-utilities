import React, { useState, useEffect } from "react";

import Section from "react-bulma-components/lib/components/section";
import Container from "react-bulma-components/lib/components/container";
import Heading from "react-bulma-components/lib/components/heading";

import MainWithLogin from "../../layouts/MainWithLogin";
import githubApi from "../../utils/githubApi";
import { useReadyStep } from "../../utils/ready";

import LeadDev from "./components/LeadDev";
import Contributors from "./components/Contributors";

import { library } from '@fortawesome/fontawesome-svg-core';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';

library.add( faGlobe );

function Developers() {

    const [ completeStep ] = useReadyStep("setupDevs");

    const [ lead, setLead ] = useState();
    const [ contributors, setContributors ] = useState([]);

    useEffect(() => {

        const owner = "ac524";
        const project = "instructor-utilities";

        const fetchData = async () => {

            const { data } = await githubApi.getRepoContributors( owner, project );
    
            setLead( data.find( contributor => contributor.login === owner ) );
            setContributors( data.filter( contributor => contributor.login !== owner ).map( ({ login, contributions }) => ({ login, contributions }) ) );
    
            completeStep();
    
        };

        fetchData();

    }, [ completeStep ]);

    return (
        <MainWithLogin>
            <Section className="has-background-white-bis">
                <Container>
                    <Heading>Meet The Developers</Heading>
                    <p className="my-3">The Instructor Utilities project is built and managed by participating instructors and the students they teach.</p>
                    <Heading subtitle renderAs="h2">Project Lead</Heading>
                    {lead ? <LeadDev login={lead.login} contributions={lead.contributions} /> : null }
                    <Heading subtitle renderAs="h2">Contributors</Heading>
                    <Contributors list={contributors} />
                </Container>
            </Section>
        </MainWithLogin>
    )
}

export default Developers;