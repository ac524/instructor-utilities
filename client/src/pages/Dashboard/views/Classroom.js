import React, { useState, useEffect } from "react";
import api from "../../../utils/api";
import Section from "react-bulma-components/lib/components/section";
import Heading from "react-bulma-components/lib/components/heading";
import Columns from "react-bulma-components/lib/components/columns";
import Card from "react-bulma-components/lib/components/card";

import { useReadyStep } from "../../../utils/ready";

function Classroom() {

    const [ addStep, completeStep, removeStep ] = useReadyStep();

    const [ students, setStudents ] = useState( [] );

    useEffect( () => {

        addStep();

        api.getStudents().then((res) => {

            setStudents( res.data.results );
            completeStep();
            
        });

        return () => {
            removeStep();
        }

    }, [addStep, completeStep, removeStep] );

    return (
        <Section>
            <Heading>Classroom</Heading>
            <Columns className={"is-multiline"}>
                {students.map(student => {
                    return (
                        <Columns.Column key={student.id.value} size="one-fifth">
                            <Card>
                                <Card.Content>
                                    {student.name.first} {student.name.last}
                                </Card.Content>
                            </Card>
                        </Columns.Column>
                    )
                })}
            </Columns>
        </Section>
    )
}

export default Classroom;