import React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Columns from "react-bulma-components/lib/components/columns";
import Card from "react-bulma-components/lib/components/card";
import Button from "react-bulma-components/lib/components/button";
import Tag from "react-bulma-components/lib/components/tag";

import { getDashboardAction as gda, useStudents, useDashboardDispatch, useStaffMember } from "pages/Dashboard/store";
import { EDIT_STUDENT, REMOVE_STUDENT } from "pages/Dashboard/store/actions";
import Dropdown from "components/Dropdown";

import "./style.sass";

export const StudentMenu = ({ _id }) => {

    const dispatch = useDashboardDispatch();

    const openEdit = (_id) => {
        dispatch(gda(EDIT_STUDENT, _id));
    }

    const removeStudent = (_id) => {
        dispatch(gda(REMOVE_STUDENT, _id));
    }

    const dropdownLabel = <FontAwesomeIcon icon="ellipsis-h" />;

    return (
        <Dropdown label={dropdownLabel} className="ml-auto is-right">
            <Button className="dropdown-item" onClick={() => openEdit(_id) }>
                <span className="icon"><FontAwesomeIcon icon="pen-square" /></span>
                <span>Edit Student</span>
            </Button>
            <Button className="dropdown-item" onClick={() => removeStudent(_id) }>
                <span className="icon"><FontAwesomeIcon icon={["far","trash-alt"]} /></span>
                <span>Remove Student</span>
            </Button>
        </Dropdown>
    );
}

export const StudentCard = ({ student: { _id, name, priorityLevel, assignedTo } }) => {

    const assignedStaff = useStaffMember( assignedTo );

    let priorityTag;

    if( priorityLevel < 4 ) {
        priorityTag = <Tag className="is-primary is-light">Low Priority</Tag>;
    } else if(priorityLevel > 7) {
        priorityTag = <Tag color="danger" className="is-light">High Priority</Tag>;
    } else {
        priorityTag = <Tag color="warning" className="is-light">Medium Priority</Tag>;
    }

    const assignedToTag = assignedStaff._id
        ? <Tag style={{flexGrow:1}}  className="is-primary is-light">{ `Assigned to ${assignedStaff.user.name}`}</Tag>
        : <Tag style={{flexGrow:1}}>Not Assigned</Tag>

    return (
        <Card>
            <Card.Content className="is-flex" style={{alignItems: "center"}}>
                <span>{name}</span>
                <StudentMenu _id={_id} />
            </Card.Content>
            <Tag.Group gapless>
                {priorityTag}
                {assignedToTag}
            </Tag.Group>
        </Card>
    );

}

function StudentList() {

    const students = useStudents();

    return (
        <Columns className="is-multiline student-list">
            {students.map(student => {
                return (
                    <Columns.Column key={student._id} size="one-fifth">
                        <StudentCard student={student} />
                    </Columns.Column>
                )
            })}
        </Columns>
    )

}

export default StudentList;