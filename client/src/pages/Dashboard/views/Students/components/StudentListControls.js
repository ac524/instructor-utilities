import React from "react";

import {
    Form as FormCollection,
    Button
} from "react-bulma-components";

import Icon from "components/Icon";
import { useDashboardDispatch, getDashboardAction as gda } from "pages/Dashboard/store";
import { EDIT_STUDENT } from "pages/Dashboard/store/actionsNames";
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

    const AddStudentButton = () => {
        return (
            <Button className="is-icon-only-mobile" onClick={() => dispatch(gda(EDIT_STUDENT, null))}>
                <Icon icon="plus-circle" />
                <span>Add Student</span>
            </Button>
        );
    }

    return (
        <div className="is-flex mb-5">
            <RequirePerm item="student" action="create" component={AddStudentButton} />
            <Button className="ml-2">
                <span>Adjust Priority</span>
            </Button>
            <Button className="ml-2">
                <span>Reassign</span>
            </Button>
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