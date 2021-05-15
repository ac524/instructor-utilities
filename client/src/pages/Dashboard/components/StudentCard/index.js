
import {
    Card,
    Button,
    Tag
} from "react-bulma-components";

import api from "utils/api";
import Icon from "components/Icon";
import Dropdown from "components/Dropdown";
import { getDashboardAction as gda, useDashboardContext, useDashboardDispatch, useStaffMember } from "pages/Dashboard/store";
import { EDIT_STUDENT, REMOVE_STUDENT, SELECT_STUDENT, UNSELECT_STUDENT } from "pages/Dashboard/store/actionsNames";
import { getPriorityLevel } from "pages/Dashboard/utils/student";

import "./style.sass";
import { useMemo } from "react";

export const StudentMenu = ({ _id, name }) => {
    
    const dispatch = useDashboardDispatch();

    const openEdit = (_id) => {
        dispatch(gda(EDIT_STUDENT, _id));
    }

    const removeStudent = async(_id) => {
        dispatch(gda( REMOVE_STUDENT, _id ));
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

export const StudentPriorityTag = ( { level, className, ...props } ) => {

    const priorityLevel = getPriorityLevel( level );

    const classes = className ? [className] : [];
    classes.push("is-light");

    return <Tag color={priorityLevel.color} className={classes.join(" ")} {...props}><Icon icon="exclamation-circle"/><span>{priorityLevel.label}</span></Tag>;
    
}

export const StudentAssignmentTag = ( { assignedTo, ...props } ) => {

    const assignedStaff = useStaffMember( assignedTo );

    let assignedText;
    const tagProps = {};

    if( assignedStaff && assignedStaff._id ) {
        tagProps.color = "primary";
        tagProps.className = "is-light";
        assignedText = assignedStaff.user.name;
    } else {
        assignedText = "Not Assigned"
    }

    return <Tag {...tagProps} {...props}><Icon icon="user-friends"/><span>{assignedText}</span></Tag>
    
}

const StudentBulkSelect = ({ studentId }) => {

    const [ { classroom: { selectedStudents } }, dispatch ] = useDashboardContext();

    const isSelected = useMemo(() => selectedStudents.includes(studentId), [selectedStudents]);

    const updateStudent = () => dispatch(gda(isSelected ? UNSELECT_STUDENT : SELECT_STUDENT, studentId));

    return <input
        type="checkbox"
        className="ml-auto"
        checked={isSelected}
        onChange={updateStudent}
    />

}

export const StudentCard = ({ className, student: { _id, name, priorityLevel, assignedTo, elevation, isSelected = false } }) => {

    const dispatch = useDashboardDispatch();
    const openEdit = () => dispatch(gda(EDIT_STUDENT, _id));
    
    return (
        <Card className={"student-card is-flex"+(className ? " "+className : "")} style={{flexDirection:"column"}}>
            <Card.Content className="is-flex" style={{alignItems: "center"}}>
                <span onClick={openEdit} className="student-name">{name}</span>
                <StudentBulkSelect studentId={_id} />
            </Card.Content>
            <Tag.Group gapless className="mt-auto">
                <StudentPriorityTag level={priorityLevel} style={{flexGrow:1}} />
                <StudentAssignmentTag assignedTo={assignedTo} style={{flexGrow:1}} />
                { elevation ? <Tag color="danger"><Icon icon="level-up-alt" /></Tag> : null }
            </Tag.Group>
        </Card>
    );

}