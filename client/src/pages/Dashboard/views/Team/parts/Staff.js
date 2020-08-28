import React from "react";

import Columns from "react-bulma-components/lib/components/columns";
import Box from "react-bulma-components/lib/components/box";
import Heading from "react-bulma-components/lib/components/heading";
import Button from "react-bulma-components/lib/components/button";
import Panel from "react-bulma-components/lib/components/panel";
import Tag from "react-bulma-components/lib/components/tag";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useStaff, useAssignedStudents } from "pages/Dashboard/store";
import WebLink from "components/WebLink";
import { StudentPriorityTag } from "pages/Dashboard/parts/StudentCard";
// import { Link } from "react-router-dom";

const { Column } = Columns;

export const Member = ( { member: { _id, role, user: { name, github } } } ) => {

    const assignedStudents = useAssignedStudents( _id );

    return (
        <Columns>
            <Column size="one-quarter" className="has-filled-content">
                <Box className="has-text-centered has-filled-content">
                    {
                        <div className="is-flex" style={{ flexDirection: "column" }}>
                            <div className="is-circle has-background-light mb-4 mx-auto" style={{width:"128px",height:"128px"}}></div>
                            {name ? <Heading renderAs="h2" size={4} className="my-0">{name}</Heading> : null }
                            {<Heading renderAs="p" size={5} subtitle className="my-0">{role}</Heading> }
                            {/* <div className="mt-4">
                                <Button renderAs={Link} to="/team">View</Button>
                            </div> */}
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
            <Column className="has-filled-content">
                <Panel className="has-background-white">
                    <Panel.Header className="is-flex" style={{alignItems:"center"}}>
                        Students
                        <Button className="ml-auto" size="small">
                            <FontAwesomeIcon icon="ellipsis-h" />
                        </Button>
                    </Panel.Header>
                    {assignedStudents.map( ({name, priorityLevel}) => (
                        <Panel.Block>
                            {name}
                            <Tag.Group gapless className="ml-auto">
                                <StudentPriorityTag level={priorityLevel} />
                            </Tag.Group>
                        </Panel.Block>
                    ))}
                </Panel>
            </Column>
        </Columns>
    )

}

function Staff() {

    const staff = useStaff();

    return (
        <div class="staff">
            {staff.map(member => <Member key={member._id} member={member} />)}
        </div>
    )

}

export default Staff;