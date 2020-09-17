import React, { useState, useEffect } from "react";

import {
    Columns,
    Box,
    Image,
    Heading
} from "react-bulma-components";

import { useReadyStep } from "utils/ready";
import githubApi from "utils/githubApi";

import Pulse from "components/Pulse";
import WebLink from "components/WebLink";

const { Column } = Columns;

export const ContributorLinks = ( { profile } ) => {

    const links = [];

    return links.length

        ? <p></p>

        : null;

}

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
            <Box className="has-text-centered has-filled-content">
                {
                    profile

                        ? (
                            <div className="is-flex" style={{ flexDirection: "column" }}>
                                <WebLink href={profile.html_url} className="is-block mb-3">
                                    <Image src={ profile.avatar_url } rounded size={128} className="mx-auto mb-1 has-img-shadow" />
                                    @{profile.login}
                                </WebLink>
                                {profile.name ? <Heading renderAs="h3" size={5} className="my-0">{profile.name}</Heading> : null }
                                {profile.bio ? <p>{profile.bio}</p> : null}
                                <div className="mt-auto">
                                    <p>
                                        <span className="is-size-3">{contributions}</span>
                                        <br />
                                        Commits
                                    </p>
                                </div>
                            </div>
                        )

                        : <Pulse />
                }
            </Box>
        </Column>
    );
}

const Contributors = ({ list }) => {
    return (
        <Columns>
            {list.map( contributor => <Contributor key={contributor.login} {...contributor} /> )}
        </Columns>
    );
}

export default Contributors;