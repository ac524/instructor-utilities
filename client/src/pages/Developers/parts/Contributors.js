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

export const Contributor = ({ login, contributions }) => {

    const [ completeStep ] = useReadyStep(`Contributor-${login}`);
    const [ profile, setProfile ] = useState({});

    useEffect(() => {

        const loadUser = async () => {

            const { data } = await githubApi.getUser(login);
    
            setProfile( data );
    
            completeStep();
    
        }

        loadUser();

    }, [ login, setProfile, completeStep ]);

    return (
        <Column size="one-quarter" className="has-filled-content">
            <Box className="has-text-centered">
                {
                    profile

                        ? (
                            <div>
                                <WebLink href={profile.html_url}>
                                    <Image src={ profile.avatar_url } rounded size="128x128" className="mx-auto mb-3" />
                                    @{profile.login}
                                </WebLink>
                                <Heading renderAs="h3" size="5" className="my-0">{profile.name}</Heading>
                                <p>
                                    <span className="is-size-3">{contributions}</span>
                                    <br />
                                    Commits
                                </p>
                            </div>
                        )

                        : <Pulse />
                }
            </Box>
        </Column>
    );
}

function Contributors({ list }) {
    return (
        <Columns>
            {list.map( contributor => <Contributor key={contributor.login} {...contributor} /> )}
        </Columns>
    );
}

export default Contributors;