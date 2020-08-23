import React, { useState, useEffect } from "react";
import api from "../utils/api";
import Section from "react-bulma-components/lib/components/section";
import Columns from "react-bulma-components/lib/components/columns";
import Card from "react-bulma-components/lib/components/card";
import Main from "../layouts/Main";

function Classroom() {

    const [ students, setStudents ] = useState( [] );

    useEffect( () => {

        api.getStudents().then((res) => {

            setStudents( res.data.results );
            
        });

    }, [] );

    return (
        <Main>
            <Section>
                <Columns className={"is-multiline"}>
                    {students.map(student => {
                        return (
                            <Columns.Column key={student.id} size="one-fifth">
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
        </Main>
    )
}

export default Classroom;