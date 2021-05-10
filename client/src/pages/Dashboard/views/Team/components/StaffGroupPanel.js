import { useLocation } from "react-router-dom";

import {
    Heading,
    Panel,
    Tag
} from "react-bulma-components";

import { useAssignedStudents } from "pages/Dashboard/store";
import { useStudentGroups } from "pages/Dashboard/utils/student";
import RoomLink from "pages/Dashboard/components/RoomLink";

export const StaffGroupPanelBlock = ( { member: { _id, user } } ) => {

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
    );

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
    );

}

export default StaffGroupPanel;