import React from "react";

import {
    Card,
    Button,
    Tag
} from "react-bulma-components";

import "./style.sass";
import Icon from "../../../../components/Icon";
import Dropdown from "../../../../components/Dropdown";
import { getDashboardAction as gda, useDashboardDispatch, useStaffMember } from "../../store";
import { EDIT_STUDENT } from "../../store/actions";
import api from "../../../../utils/api";
import { usePriorityLevel } from "../../utils/student";

export const StudentMenu = ({ _id, name }) => {
    
    const dispatch = useDashboardDispatch();

    const openEdit = (_id) => {
        dispatch(gda(EDIT_STUDENT, _id));
    }

    const removeStudent = async(_id) => {
        await api.removeStudent( _id );
    }

    const dropdownLabel = <Icon icon="ellipsis-h" />;

    return (
        <Dropdown id={`student-${_id}-ddoptions`} label={dropdownLabel} ariaLabel={`Open options for ${name}`} labelSize="small" className="ml-auto is-right">
            <Button className="dropdown-item" size="small" onClick={() => openEdit(_id) }>
                <Icon icon="pen-square" />
                <span>Edit Student</span>
            </Button>
            <Button className="dropdown-item" size="small" onClick={() => removeStudent(_id) }>
                <Icon icon={["far","trash-alt"]} />
                <span>Remove Student</span>
            </Button>
        </Dropdown>
    );
}

export const StudentPriorityTag = ( { level, ...props } ) => {

    const priorityLevel = usePriorityLevel( level );

    return <Tag color={priorityLevel.color} className="is-light" {...props}><Icon icon="exclamation-circle"/><span>{priorityLevel.label}</span></Tag>;
    
}

export const StudentAssignmentTag = ( { assignedTo, ...props } ) => {

    const assignedStaff = useStaffMember( assignedTo );

    let assignedText;
    const tagProps = {};

    if( assignedStaff._id ) {
        tagProps.color = "primary";
        tagProps.className = "is-light";
        assignedText = assignedStaff.user.name;
    } else {
        assignedText = "Not Assigned"
    }

    return <Tag {...tagProps} {...props}><Icon icon="user-friends"/><span>{assignedText}</span></Tag>
    
}

export const StudentCard = ({ className, student: { _id, name, priorityLevel, assignedTo } }) => {

    return (
        <Card className={"student-card is-flex"+(className ? " "+className : "")} style={{flexDirection:"column"}}>
            <Card.Content className="is-flex" style={{alignItems: "center"}}>
                <span>{name}</span>
                <StudentMenu _id={_id} name={name} />
            </Card.Content>
            <Tag.Group gapless className="mt-auto">
                <StudentPriorityTag level={priorityLevel} style={{flexGrow:1}} />
                <StudentAssignmentTag assignedTo={assignedTo} style={{flexGrow:1}} />
            </Tag.Group>
        </Card>
    );

}