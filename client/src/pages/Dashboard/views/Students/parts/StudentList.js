import React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Columns from "react-bulma-components/lib/components/columns";
import Card from "react-bulma-components/lib/components/card";

import { useDashboardContext, getDashboardAction as gda } from "pages/Dashboard/store";
import { EDIT_STUDENT } from "pages/Dashboard/store/actions";

function StudentList() {

    const [ { students }, dispatch ] = useDashboardContext();

    const openEdit = (_id) => {
        dispatch(gda(EDIT_STUDENT, _id));
    }

    return (
        <Columns className={"is-multiline"}>
            {students.map(student => {
                return (
                    <Columns.Column key={student._id} size="one-fifth">
                        <Card>
                            <Card.Content className="is-flex">
                                {student.name}
                                <a href="#editStudent" role="button" className="ml-auto" onClick={(e) => { e.preventDefault(); openEdit(student._id); }}>
                                    <FontAwesomeIcon icon="pen-square" />
                                </a>
                            </Card.Content>
                        </Card>
                    </Columns.Column>
                )
            })}
        </Columns>
    )

}

export default StudentList;