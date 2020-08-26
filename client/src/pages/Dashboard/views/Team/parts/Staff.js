import React from "react";

import Columns from "react-bulma-components/lib/components/columns";
import Box from "react-bulma-components/lib/components/box";
import Heading from "react-bulma-components/lib/components/heading";
import Button from "react-bulma-components/lib/components/button";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useStaff } from "pages/Dashboard/store";
import WebLink from "components/WebLink";
import { Link } from "react-router-dom";

const { Column } = Columns;

export const Member = ( { member: { role, user: { name, github } } } ) => {

    return (
        
        <Column size="one-quarter" className="has-filled-content">
            <Box className="has-text-centered has-filled-content">
                {
                    <div className="is-flex" style={{ flexDirection: "column" }}>
                        <div className="is-circle has-background-light mb-4 mx-auto" style={{width:"128px",height:"128px"}}></div>
                        {name ? <Heading renderAs="h2" size={4} className="my-0">{name}</Heading> : null }
                        {<Heading renderAs="p" size={5} subtitle className="my-0">{role}</Heading> }
                        <div className="mt-4">
                            <Button renderAs={Link} to="/team">View</Button>
                        </div>
                        <div className="mt-4">
                            {
                                github

                                    ? (
                                    <p>
                                        <WebLink href={`https://github.com/${github}`}>
                                            <FontAwesomeIcon icon={["fab","github"]}/> {github}
                                        </WebLink>
                                    </p>
                                    )
                                    
                                    : null
                            }
                        </div>
                    </div>
                }
            </Box>
        </Column>
    )

}

function Staff() {

    const staff = useStaff();

    return (
        <Columns>
            {staff.map(member => <Member key={member._id} member={member} />)}
        </Columns>
    )

}

export default Staff;