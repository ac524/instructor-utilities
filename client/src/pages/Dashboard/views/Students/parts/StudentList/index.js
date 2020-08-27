import React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Columns from "react-bulma-components/lib/components/columns";
import Card from "react-bulma-components/lib/components/card";
import Button from "react-bulma-components/lib/components/button";
import Tag from "react-bulma-components/lib/components/tag";

import { getDashboardAction as gda, useStudents, useDashboardDispatch } from "pages/Dashboard/store";
import { EDIT_STUDENT, REMOVE_STUDENT } from "pages/Dashboard/store/actions";
import Dropdown from "components/Dropdown";

import "./style.sass";

function StudentList() {

    const dispatch = useDashboardDispatch();
    const students = useStudents();

    const openEdit = (_id) => {
        dispatch(gda(EDIT_STUDENT, _id));
    }

    const removeStudent = (_id) => {
        dispatch(gda(REMOVE_STUDENT, _id));
    }

    const dropdownLabel = <FontAwesomeIcon icon="ellipsis-h" />;

    return (
        <Columns className="is-multiline student-list">
            {students.map(student => {
                return (
                    <Columns.Column key={student._id} size="one-fifth">
                        <Card>
                            <Card.Content className="is-flex" style={{alignItems: "center"}}>
                                <span>{student.name}</span>
                                <Dropdown label={dropdownLabel} className="ml-auto is-right">
                                    <Button className="dropdown-item" onClick={() => openEdit(student._id) }>
                                        <span className="icon"><FontAwesomeIcon icon="pen-square" /></span>
                                        <span>Edit Student</span>
                                    </Button>
                                    <Button className="dropdown-item" onClick={() => removeStudent(student._id) }>
                                        <span className="icon"><FontAwesomeIcon icon={["far","trash-alt"]} /></span>
                                        <span>Remove Student</span>
                                    </Button>
                                </Dropdown>
                            </Card.Content>
                            <Tag.Group gapless>
                                <Tag color="danger">High Priority</Tag>
                                <Tag style={{flexGrow:1}}>Not Assigned</Tag>
                            </Tag.Group>
                        </Card>
                    </Columns.Column>
                )
            })}
        </Columns>
    )

}

export default StudentList;