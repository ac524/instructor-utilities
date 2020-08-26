import React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Columns from "react-bulma-components/lib/components/columns";
import Card from "react-bulma-components/lib/components/card";

import { getDashboardAction as gda, useStudents, useDashboardDispatch } from "pages/Dashboard/store";
import { EDIT_STUDENT, REMOVE_STUDENT } from "pages/Dashboard/store/actions";

function StudentList() {

    const dispatch = useDashboardDispatch();
    const students = useStudents();

    const openEdit = (_id) => {
        dispatch(gda(EDIT_STUDENT, _id));
    }

    const removeStudent = (_id) => {
        dispatch(gda(REMOVE_STUDENT, _id));
    }

    return (
        <Columns className={"is-multiline"}>
            {students.map(student => {
                return (
                    <Columns.Column key={student._id} size="one-fifth">
                        <Card>
                            <Card.Content className="is-flex">
                                <a href="#editStudent" role="button" className="mr-2" onClick={(e) => { e.preventDefault(); openEdit(student._id); }}>
                                    <FontAwesomeIcon icon="pen-square" />
                                </a>
                                {student.name}
                                <a href="#removeStudent" role="button" className="has-text-danger ml-auto" onClick={(e) => { e.preventDefault(); removeStudent(student._id); }}>
                                    <FontAwesomeIcon icon="minus-square" />
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