import React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Columns from "react-bulma-components/lib/components/columns";
import Card from "react-bulma-components/lib/components/card";

import { useDashboardContext } from "pages/Dashboard/store";
import { ModalLink } from "components/Modal";

function StudentList() {

    const [ { students } ] = useDashboardContext();

    return (
        <Columns className={"is-multiline"}>
            {students.map(student => {
                return (
                    <Columns.Column key={student._id} size="one-fifth">
                        <Card>
                            <Card.Content className="is-flex">
                                {student.name}
                                <ModalLink className="ml-auto">
                                    <FontAwesomeIcon icon="pen-square" />
                                </ModalLink>
                            </Card.Content>
                        </Card>
                    </Columns.Column>
                )
            })}
        </Columns>
    )

}

export default StudentList;