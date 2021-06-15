import { useMemo } from "react";

import {
    Form as FormCollection,
    Button
} from "react-bulma-components";

import Icon from "components/Icon";
import { useDashboardContext, getDashboardAction as gda, useStaffByRole, useClassroomId } from "pages/Dashboard/store";
import { getStaffOptionsList } from "pages/Dashboard/utils/staff";
import { EDIT_STUDENT, UPDATE_STUDENTS } from "pages/Dashboard/store/actionsNames";
import Dropdown from "components/Dropdown";
import { useStudentGroupings } from "pages/Dashboard/utils/student";
import SortSelectDropdown from "pages/Dashboard/components/SortSelectDropdown";
import RequirePerm from "pages/Dashboard/components/RequirePerm";
import api from "utils/api";

const { Input } = FormCollection;

const StudentListControls = ( { sort, groupBy, search } ) => {

    const roomId = useClassroomId();
    
    const [ { classroom: { selectedStudents } }, dispatch ] = useDashboardContext();
    const groupTypes = useStudentGroupings().map( ({key, name, icon}) => ({
        key,
        label: `Group by ${name}`,
        icon
    }) );
    const groupLabel = <Icon icon="columns" />
    const { ta } = useStaffByRole();

    const staffOptionsList = useMemo(() => getStaffOptionsList(ta || []), [ta]);

    const AddStudentButton = () => {
        return (
            <Button className="is-icon-only-mobile" onClick={() => dispatch(gda(EDIT_STUDENT, null))}>
                <Icon icon="plus-circle" />
                <span>Add Student</span>
            </Button>
        );
    }

    const handleBulkReassignment = async assignedTo => {

        // Map each selected student id to an object that includes the updated `assignedTo` prop
        const studentUpdates = selectedStudents.map(_id=>({_id, assignedTo: assignedTo || null}));

        try {

            await api.updateStudents( roomId, studentUpdates );
            
            dispatch(gda(UPDATE_STUDENTS, studentUpdates));

        } catch( err ) {

            // TODO Error handling
            console.log(err);

        }

    };

    return (
        <div className="is-flex mb-5">
            <RequirePerm item="student" action="create" component={AddStudentButton} />
            {(selectedStudents.length || null) &&
            <div>
                <Dropdown className="ml-2" label="Reassign">
                    {staffOptionsList.map(staff => (
                        <Button className="dropdown-item" key={staff.value} onClick={() => handleBulkReassignment(staff.value)}>{staff.label}</Button>
                    ))}
                </Dropdown>
                <Button className="ml-2">Clear</Button>
            </div>}
            <Input
                className="ml-auto"
                type="text"
                value={search[0]}
                placeholder="Search Name"
                onChange={(e) => search[1](e.target.value)} style={{maxWidth:"135px"}}
            />
            <SortSelectDropdown state={sort} className="ml-2 is-right" />
            <Dropdown className="is-right ml-2" label={groupLabel}>
                {[ { key: "none", label: "No Grouping", icon: "ban" }, ...groupTypes ].map( groupType => {
                    const classes = ["dropdown-item"];

                    if( groupType.key === groupBy[0] ) classes.push("is-active");

                    return (
                        <Button key={groupType.key} className={classes.join(" ")} size="small" onClick={() => groupBy[1](groupType.key)}>
                            <Icon icon={groupType.icon} />
                            <span>{groupType.label}</span>
                        </Button>
                    )
                })}
            </Dropdown>
        </div>
                    
    );

}

export default StudentListControls;