import React, { useState, useEffect } from "react";

import Columns from "react-bulma-components/lib/components/columns";
import Box from "react-bulma-components/lib/components/box";
import Image from "react-bulma-components/lib/components/image";
import Heading from "react-bulma-components/lib/components/heading";

import { useReadyStep } from "../../../utils/ready";
import githubApi from "../../../utils/githubApi";
import Pulse from "../../../components/Pulse";
import WebLink from "../../../components/WebLink";

const { Column } = Columns;

function LeadDev({ login, contributions }) {

    const [ addStep, completeStep, removeStep ] = useReadyStep(`LeadDev-${login}`);
    const [ profile, setProfile ] = useState();

    useEffect(() => {

        addStep();

        loadUser();

        return () => removeStep();

    }, []);

    const loadUser = async () => {

        const { data } = await githubApi.getUser(login);

        console.log( data );

        setProfile( data );

        completeStep();

    }

    return (
        <Box>
            {
                profile

                    ? (
                        <Columns>
                            <Column size="one-quarter" className="has-text-centered">
                                <WebLink href={profile.html_url}>
                                    <Image src={ profile.avatar_url } rounded size="square" className="mx-auto mb-3" />
                                    @{profile.login}
                                </WebLink>
                            </Column>
                            <Column>
                                <Heading renderAs="h3">{profile.name}</Heading>
                                <p>{profile.bio}</p>
                            </Column>
                            <Column className="has-text-centered">
                                <p>
                                    <span className="is-size-2">{contributions}</span>
                                    <br />
                                    Commits
                                </p>
                            </Column>
                        </Columns>
                    )

                    : <Pulse /> 
            }
            
        </Box>
    )
}

export default LeadDev;