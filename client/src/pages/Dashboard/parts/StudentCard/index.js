import React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Card from "react-bulma-components/lib/components/card";
import Button from "react-bulma-components/lib/components/button";
import Tag from "react-bulma-components/lib/components/tag";

import Dropdown from "components/Dropdown";
import { getDashboardAction as gda, useDashboardDispatch, useStaffMember } from "pages/Dashboard/store";
import { EDIT_STUDENT, REMOVE_STUDENT } from "pages/Dashboard/store/actions";

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
        <Dropdown label={dropdownLabel} labelSize="small" className="ml-auto is-right">
            <Button className="dropdown-item" size="small" onClick={() => openEdit(_id) }>
                <span className="icon"><FontAwesomeIcon icon="pen-square" /></span>
                <span>Edit Student</span>
            </Button>
            <Button className="dropdown-item" size="small" onClick={() => removeStudent(_id) }>
                <span className="icon"><FontAwesomeIcon icon={["far","trash-alt"]} /></span>
                <span>Remove Student</span>
            </Button>
        </Dropdown>
    );
}

export const StudentPriorityTag = ( { level, ...props } ) => {

    if( level < 4 )

        return <Tag className="is-primary is-light" {...props}>Low Priority</Tag>;

    if( level > 7 )

        return <Tag color="danger" className="is-light" {...props}>High Priority</Tag>;

    return <Tag color="warning" className="is-light" {...props}>Medium Priority</Tag>;
    
}

export const StudentCard = ({ student: { _id, name, priorityLevel, assignedTo } }) => {

    const assignedStaff = useStaffMember( assignedTo );

    const assignedToTag = assignedStaff._id
        ? <Tag style={{flexGrow:1}}  className="is-primary is-light">{ `Assigned to ${assignedStaff.user.name}`}</Tag>
        : <Tag style={{flexGrow:1}}>Not Assigned</Tag>

    return (
        <Card className="student-card is-flex" style={{flexDirection:"column"}}>
            <Card.Content className="is-flex" style={{alignItems: "center"}}>
                <span>{name}</span>
                <StudentMenu _id={_id} />
            </Card.Content>
            <Tag.Group gapless className="mt-auto">
                <StudentPriorityTag level={priorityLevel} style={{flexGrow:1}} />
                {assignedToTag}
            </Tag.Group>
        </Card>
    );

}