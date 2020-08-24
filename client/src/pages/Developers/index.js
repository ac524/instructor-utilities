import React, { useState, useEffect } from "react";

import Section from "react-bulma-components/lib/components/section";
import Container from "react-bulma-components/lib/components/container";
import Heading from "react-bulma-components/lib/components/heading";

import MainWithLogin from "../../layouts/MainWithLogin";
import githubApi from "../../utils/githubApi";
import { useReadyStep } from "../../utils/ready";

import LeadDev from "./parts/LeadDev";
import Contributors from "./parts/Contributors";


function Developers() {

    const [ addStep, completeStep, removeStep ] = useReadyStep("setupDevs");

    const owner = "ac524";
    const project = "instructor-utilities";

    const [ lead, setLead ] = useState();
    const [ contributors, setContributors ] = useState([]);

    useEffect(() => {

        addStep();
        fetchData();

        return () => {
            return removeStep();
        }

    }, []);

    const fetchData = async () => {

        const { data } = await githubApi.getRepoContributors( owner, project );

        console.log( data );

        setLead( data.find( contributor => contributor.login === owner ) );
        setContributors( data.filter( contributor => contributor.login !== owner ).map( ({ login, contributions }) => ({ login, contributions }) ) );

        completeStep();

    };

    return (
        <MainWithLogin>
            <Section>
                <Container>
                    <Heading>Meet The Developers</Heading>
                    <p className="my-3">The Instructor Utilities project is built and managed by participating instructors and the students they teach.</p>
                    <Heading subtitle>Project Lead</Heading>
                    {lead ? <LeadDev login={lead.login} contributions={lead.contributions} /> : null }
                    <Heading subtitle>Contributors</Heading>
                    <Contributors list={contributors} />
                </Container>
            </Section>
        </MainWithLogin>
    )
}

export default Developers;