import React, { useState, useEffect } from "react";

import Columns from "react-bulma-components/lib/components/columns";
import Box from "react-bulma-components/lib/components/box";
import Image from "react-bulma-components/lib/components/image";
import Heading from "react-bulma-components/lib/components/heading";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useReadyStep } from "../../../utils/ready";
import githubApi from "../../../utils/githubApi";
import Pulse from "../../../components/Pulse";
import WebLink from "../../../components/WebLink";

const { Column } = Columns;

function LeadDev({ login, contributions }) {

    const [ completeStep ] = useReadyStep(`LeadDev-${login}`);
    const [ profile, setProfile ] = useState();

    useEffect(() => {

        const loadUser = async () => {

            const { data } = await githubApi.getUser(login);

            console.log( data );

            setProfile( data );

            completeStep();

        }

        loadUser();

    }, [login, completeStep]);

    return (
        <Box>
            {
                profile

                    ? (
                        <Columns className="is-vcentered">
                            <Column size="one-quarter" className="has-text-centered">
                                <WebLink href={profile.html_url} className="is-block mw-80 mx-auto">
                                    <Image src={ profile.avatar_url } rounded size="square" className="mx-auto mb-3 has-img-shadow" />
                                </WebLink>
                            </Column>
                            <Column>
                                <div className="mb-3">
                                    {profile.name ? <Heading renderAs="h3" className="mb-0">{profile.name}</Heading> : null }
                                    <WebLink href={profile.html_url}>@{profile.login}</WebLink>
                                </div>
                                {profile.bio ? <p className="mb-3">{profile.bio}</p> : null}
                                {profile.blog ? <p><WebLink href={profile.blog}><FontAwesomeIcon icon="globe" /> Website</WebLink></p> : null}
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