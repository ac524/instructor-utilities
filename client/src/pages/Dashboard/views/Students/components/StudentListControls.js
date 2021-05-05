import React, { useEffect, useState } from "react";

import {
    Form as FormCollection,
    Button
} from "react-bulma-components";

import Icon from "components/Icon";
import { useDashboardDispatch, getDashboardAction as gda, useStaffByRole } from "pages/Dashboard/store";
import { getStaffOptionsList } from "pages/Dashboard/utils/staff";
import { EDIT_STUDENT, UPDATE_STUDENT } from "pages/Dashboard/store/actionsNames";
import { useStudents } from "pages/Dashboard/store";
import Dropdown from "components/Dropdown";
import { useStudentGroupings } from "pages/Dashboard/utils/student";
import SortSelectDropdown from "pages/Dashboard/components/SortSelectDropdown";
import RequirePerm from "pages/Dashboard/components/RequirePerm";

const { Input } = FormCollection;

const StudentListControls = ( { sort, groupBy, search } ) => {

    const dispatch = useDashboardDispatch();
    const groupTypes = useStudentGroupings().map( ({key, name, icon}) => ({
        key,
        label: `Group by ${name}`,
        icon
    }) );
    const groupLabel = <Icon icon="columns" />
    const { ta } = useStaffByRole();
    const learners = useStudents();
    const [ students, setStudents ] = useState([]);
    const [ staffOptionsList, setStaffOptionsList ] = useState([]);

    useEffect(() => {

        setStaffOptionsList( getStaffOptionsList(ta || []) );
        setStudents( learners || [] );

    }, [ ta, setStaffOptionsList, learners, setStudents ]);

    const AddStudentButton = () => {
        return (
            <Button className="is-icon-only-mobile" onClick={() => dispatch(gda(EDIT_STUDENT, null))}>
                <Icon icon="plus-circle" />
                <span>Add Student</span>
            </Button>
        );
    }

    const handleBulkReassignment = staff => {

        const selectedStudents = students.filter(({isSelected}) => isSelected);
        
        for (const student of selectedStudents) {
            dispatch(gda(UPDATE_STUDENT, {
                _id: student._id, 
                assignedTo: staff.value
            }));
        }

        // TODO: API request to POST data
        
    }

    return (
        <div className="is-flex mb-5">
            <RequirePerm item="student" action="create" component={AddStudentButton} />
            {/* TODO: "Reassign" only appears when a student is checked */}
            {/* {(students.some(student => {student.isSelected})) ? */}
            <Dropdown className="ml-2" label="Reassign">
                {staffOptionsList.map(staff => (
                    <Button className="dropdown-item" key={staff.value} onClick={() => handleBulkReassignment(staff)}>{staff.label}</Button>
                ))}
            </Dropdown> 
            {/* : ""} */}
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