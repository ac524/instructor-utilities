import React from "react";

import Columns from "react-bulma-components/lib/components/columns";
import Card from "react-bulma-components/lib/components/card";
import Media from "react-bulma-components/lib/components/media";
import Image from "react-bulma-components/lib/components/image";
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

export const MemberCard = ( { member: { _id, role, user: { name, github } } } ) => {

    return (
        <Card>
            <Card.Content>
                <Media>
                    <Media.Item renderAs="figure" position="left">
                        <Image size={64} alt="64x64" rounded src="http://bulma.io/images/placeholders/128x128.png" />
                    </Media.Item>
                    <Media.Item>
                        <Heading size={4}>{name}</Heading>
                        {
                            github
                                ? <Heading renderAs={WebLink} className="is-block" subtitle size={6} href={`https://github.com/${github}`}><FontAwesomeIcon icon={["fab","github"]}/> {github}</Heading>
                                : null
                        }
                    </Media.Item>
                </Media>
            </Card.Content>
        </Card>
    );

}

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
                    {assignedStudents.map( ({_id, name, priorityLevel}) => (
                        <Panel.Block key={_id}>
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
        <div className="staff">
            <Columns>
                {staff.map(member => (
                    <Column key={member._id}>
                        <MemberCard member={member} /> 
                    </Column>
                ))}
            </Columns>
        </div>
    )

}

export default Staff;