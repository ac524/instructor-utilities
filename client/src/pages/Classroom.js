import React, { useState, useEffect } from "react";
import api from "../utils/api";
import Section from "react-bulma-components/lib/components/section";
import Columns from "react-bulma-components/lib/components/columns";
import Card from "react-bulma-components/lib/components/card";
import Main from "../layouts/Main";

import { useStoreContext, getStoreAction as gsa } from "../store";
import { ADD_READY_STEP, COMPLETE_READY_STEP } from "../store/actions";

function Classroom() {

    const [ ,dispatch ] = useStoreContext();

    const [ students, setStudents ] = useState( [] );

    useEffect(() => {
    }, []);

    useEffect( () => {

        dispatch(gsa(ADD_READY_STEP, "getstudents"));

        api.getStudents().then((res) => {

            setStudents( res.data.results );
            dispatch(gsa(COMPLETE_READY_STEP, "getstudents"));
            
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