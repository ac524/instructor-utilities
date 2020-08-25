import React, { useState, useEffect } from "react";

import Section from "react-bulma-components/lib/components/section";
import Columns from "react-bulma-components/lib/components/columns";
import Card from "react-bulma-components/lib/components/card";

import api from "../../../utils/api";
import { useReadyStep } from "../../../utils/ready";
import { useTopbarConfig } from "../parts/Topbar";

function Classroom() {

    useTopbarConfig({ name: "Classroom" });

    const [ completeStep ] = useReadyStep();

    const [ students, setStudents ] = useState( [] );

    useEffect( () => {

        api.getStudents().then((res) => {

            setStudents( res.data );
            completeStep();
            
        });

    }, [ completeStep ] );

    return (
        <Section>
            <Columns className={"is-multiline"}>
                {students.map(student => {
                    return (
                        <Columns.Column key={student._id} size="one-fifth">
                            <Card>
                                <Card.Content>
                                    {student.name}
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