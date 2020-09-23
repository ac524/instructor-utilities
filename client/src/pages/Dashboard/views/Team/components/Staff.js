import React, { useState, useEffect } from "react";

import {
    Columns,
    Card,
    Media,
    Image,
    Heading,
    Button,
    Panel,
    Tag
} from "react-bulma-components";

import Icon from "components/Icon";
import { useAssignedStudents, useDashboardDispatch, getDashboardAction as gda, useStaffByRole } from "pages/Dashboard/store";
import { StudentPriorityTag } from "pages/Dashboard/components/StudentCard";
import RoomLink from "pages/Dashboard/components/RoomLink";
import { Redirect, Route, Switch, useLocation, useParams } from "react-router-dom";
import SortSelectDropdown from "pages/Dashboard/components/SortSelectDropdown";
import { useStudentSort, useStudentGroups } from "pages/Dashboard/utils/student";
import { EDIT_STUDENT } from "pages/Dashboard/store/actions";
import StudentModal from "pages/Dashboard/components/StudentModal";
import { ModalProvider } from "components/Modal";

const { Column } = Columns;

export const MemberCardButton = ( { isActive, onClick = () => undefined, member: { _id, role, user: { name, github } } } ) => {

    const color = isActive ? "primary" : "white";
    const classes = ["is-small"];

    if( isActive ) classes.push("is-light", "is-focused");

    return (
        <Card renderAs={Button} color={color} className={classes.join(" ")} onClick={onClick}>
            <Card.Content renderAs="span" className="is-block">
                <Media style={{alignItems:"center"}} renderAs="span">
                    <Media.Item renderAs="figure" position="left">
                        <Image size={48} alt="" rounded src="http://bulma.io/images/placeholders/128x128.png" />
                    </Media.Item>
                    <Media.Item className="has-text-nowrap" renderAs="span">
                        <Heading size={5} renderAs="span" className="is-block">{name}</Heading>
                        <Heading size={6} subtitle renderAs="span" className="is-block">{role}</Heading>
                    </Media.Item>
                </Media>
            </Card.Content>
        </Card>
    );

}

export const Member = () => {

    const dispatch = useDashboardDispatch();
    const { memberId } = useParams();
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
            {assignedStudents.sort( studentSort ).map( ({_id, name, priorityLevel}) => (
                <Panel.Block key={_id}>
                    <span>{name}</span>
                    <Tag.Group gapless className="ml-auto mb-0">
                        <StudentPriorityTag level={priorityLevel} className="mb-0"/>
                    </Tag.Group>
                    <Button size="small" onClick={()=>openEdit(_id)} className="ml-2"><Icon icon="ellipsis-h" /></Button>
                </Panel.Block>
            ))}
        </Panel>
    )

}

const StaffGroupPanelBlock = ( { member: { _id, user } } ) => {

    const assignedStudents = useAssignedStudents( _id );
    const groupedStudents = useStudentGroups( assignedStudents, "priority" );

    const location = useLocation();
    const isMemberActive = memberId => location.pathname.endsWith(`/team/${memberId}`);

    return (
        <Panel.Block key={_id} renderAs={RoomLink} to={`/team/${_id}`} active={isMemberActive(_id)}>
            <span className="has-overflow-ellipsis">{user.name}</span>
            <Tag.Group gapless className="ml-auto mb-0" style={{flexWrap:"nowrap"}}>
                {groupedStudents.filter(group=>group.entries.length).map( group => {
                    return <Tag key={group.group.key} color={group.group.color} className="is-light mb-0">{group.entries.length}</Tag>;
                } )}
            </Tag.Group>
        </Panel.Block>
    )

}

const StaffGroupPanel = ({ title, staff }) => {

    return (
        <Panel className="has-background-white is-shadowless is-radiusless">
            <Heading className="is-flex is-light px-3" renderAs="h3" size={5}>
                <span>{title}</span>
            </Heading>
            {staff.map( member => (
                <StaffGroupPanelBlock key={member._id} member={member} />
            ))}
        </Panel>
    )
}

const Staff = () => {

    const staff = useStaffByRole();
    const { roomId } = useParams();

    const [ selected, setSelected ] = useState({});

    useEffect(() => {
        if( staff.length && !selected._id ) setSelected( staff[0] );
    }, [staff, selected]);

    return (
        <div className="staff">
            <ModalProvider>
                <Columns>
                    <Column tablet={{size:"half"}} desktop={{size:"one-quarter"}}>
                        {staff.instructor && <StaffGroupPanel title="Instructors" staff={staff.instructor} />}
                        {staff.ta && <StaffGroupPanel title="TAs" staff={staff.ta} />}
                    </Column>
                    <Column>
                        <Switch>
                            <Route exact path={`/${roomId}/team/:memberId`} component={Member} />
                            <Route render={({ location })=><Redirect to={{ pathname: `/${roomId}/team/${staff.instructor[0]._id}`, state: { from: location } }} />} />
                        </Switch>
                    </Column>
                </Columns>
                <StudentModal />
            </ModalProvider>
        </div>
    )

}

export default Staff;