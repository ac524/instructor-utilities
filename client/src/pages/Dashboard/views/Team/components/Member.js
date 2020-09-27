import React, { useState } from "react";
import { useParams } from "react-router-dom";

import {
    Heading,
    Button,
    Panel,
    Tag
} from "react-bulma-components";

import Icon from "components/Icon";
import { useAssignedStudents, useDashboardDispatch, getDashboardAction as gda, useStaffMember } from "pages/Dashboard/store";
import { useStudentSort } from "pages/Dashboard/utils/student";
import SortSelectDropdown from "pages/Dashboard/components/SortSelectDropdown";
import { StudentPriorityTag } from "pages/Dashboard/components/StudentCard";
import { EDIT_STUDENT } from "pages/Dashboard/store/actions";

const MemberAssignedStudentsPanel = ( { memberId } ) => {

    const dispatch = useDashboardDispatch();
    const [ sort, setSort ] = useState("priorityLevel:desc");
    const assignedStudents = useAssignedStudents( memberId );
    const studentSort = useStudentSort(sort);

    const openEdit = _id => dispatch(gda(EDIT_STUDENT, _id));

    return (
        <Panel className="has-background-white is-shadowless" renderAs="div">
            <Heading className="is-flex is-primary px-3" renderAs="h2" size={4} style={{alignItems:"center"}}>
                <Icon icon="user-graduate" />
                <span>Students</span>
                <SortSelectDropdown className="ml-auto is-right" state={[ sort, setSort ]} />
            </Heading>
            {assignedStudents.sort( studentSort ).map( ({_id, name, priorityLevel, elevation}) => (
                <Panel.Block key={_id}>
                    <span>{name}</span>
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

    return <span>Instructor</span>;

}

const TaMember = ({ member }) => {

    return <MemberAssignedStudentsPanel memberId={member._id} />;

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