import React, { useState } from "react";
import { useParams } from "react-router-dom";

import {
    Heading,
    Button,
    Panel,
    Tag
} from "react-bulma-components";

import Icon from "components/Icon";
import { useAssignedStudents, useElevatedStudents, useDashboardDispatch, getDashboardAction as gda, useStaffMember } from "pages/Dashboard/store";
import { useStudentSort } from "pages/Dashboard/utils/student";
import SortSelectDropdown from "pages/Dashboard/components/SortSelectDropdown";
import { StudentPriorityTag } from "pages/Dashboard/components/StudentCard";
import { EDIT_STUDENT } from "pages/Dashboard/store/actionsNames";

const MemberAssignedStudentsPanel = ( { students, color="primary", icon="user-graduate", title="Students" } ) => {

    const dispatch = useDashboardDispatch();
    const [ sort, setSort ] = useState("priorityLevel:desc");
    const studentSort = useStudentSort(sort);

    const openEdit = _id => dispatch(gda(EDIT_STUDENT, _id));

    const headingClasses = ["is-flex px-3"];

    if(color) headingClasses.push(`is-${color}`);

    return (
        <Panel className="has-background-white is-shadowless" renderAs="div">
            <Heading className={headingClasses.join(" ")} renderAs="h2" size={4} style={{alignItems:"center"}}>
                <Icon icon={icon} />
                <span>{title}</span>
                <SortSelectDropdown className="ml-auto is-right" state={[ sort, setSort ]} />
            </Heading>
            {students.sort( studentSort ).map( ({_id, name, priorityLevel, elevation, recentComments}) => (
                <Panel.Block key={_id}>
                    <span>{name}</span>
                    <div>
                        {recentComments?recentComments[0].data.comment:"No Comments"}
                    </div>
                    <Tag.Group gapless className="ml-auto mb-0">
                        <StudentPriorityTag level={priorityLevel} className="mb-0"/>
                        { elevation ? <Tag color="danger" className="mb-0"><Icon icon="level-up-alt" /></Tag> : null }
                    </Tag.Group>
                    <Button size="small" onClick={()=>openEdit(_id)} className="ml-2"><Icon icon="ellipsis-h" /></Button>
                </Panel.Block>
            ))}
        </Panel>
    )

}

const InstructorMember = () => {

    const elevatedStudents = useElevatedStudents();

    return <MemberAssignedStudentsPanel icon="level-up-alt" title="Elevated Students" color="danger" students={elevatedStudents} />;

}

const TaMember = ({ member }) => {

    const assignedStudents = useAssignedStudents( member._id );

    return <MemberAssignedStudentsPanel students={assignedStudents} />;

}

const componentByRole = {
    instructor: InstructorMember,
    ta: TaMember
}

const Member = () => {

    const { memberId } = useParams();
    const member = useStaffMember(memberId);

    if( !componentByRole[ member.role ] ) return <Heading>Role view missing</Heading>;

    const MemberComponent = componentByRole[ member.role ];

    return <MemberComponent member={member} />;

}

export default Member;