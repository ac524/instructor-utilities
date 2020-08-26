import React from "react";

import Section from "react-bulma-components/lib/components/section";
import Button from "react-bulma-components/lib/components/button";
import Tile from "react-bulma-components/lib/components/tile";
import Heading from "react-bulma-components/lib/components/heading";
import Box from "react-bulma-components/lib/components/box";
import Tag from "react-bulma-components/lib/components/tag";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useTopbarConfig } from "../../parts/Topbar";

function Classroom() {

    useTopbarConfig({ name: "Classroom" });

    return (
        <Section>
            <Tile kind="ancestor">
                <Tile kind="parent">
                    <Tile kind="child" renderAs={Box} size={6}>
                        <Heading>Select a Student</Heading>
                        <div className="is-flex mb-4" style={{alignItems:"center"}}>
                            <Button>
                                <span className="icon">
                                    <FontAwesomeIcon icon={['far','arrow-alt-circle-left']} />
                                </span>
                            </Button>

                            <Tag className="ml-auto" size="large" color="primary" style={{flexGrow:1}}>
                                Student Name
                            </Tag>

                            <Button className="ml-auto">
                                <span className="icon">
                                    <FontAwesomeIcon icon={['far','arrow-alt-circle-right']} />
                                </span>
                            </Button>
                        </div>
                        <p><Button size="small">
                            <span>View Student List</span>
                            <span className="icon">
                                <FontAwesomeIcon icon="angle-down" />
                            </span>
                        </Button></p>
                    </Tile>
                </Tile>
            </Tile>
        </Section>
    )
}

export default Classroom;