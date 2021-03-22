import React from "react";

import {
    Section,
    Columns,
    Button
} from "react-bulma-components";



const { Column } = Columns;

const FirstClassroom = () => {

    return (
        <Section>
            <Columns>
                <h1>Your user profile is not associated with any rooms </h1>
                <Button size="small" className="dropdown-item" >
                    {/* <Icon icon="cog" /> */}
                    <span>Create First Classroom</span>
                </Button>
            </Columns>
        </Section>
    );

}

export default FirstClassroom;