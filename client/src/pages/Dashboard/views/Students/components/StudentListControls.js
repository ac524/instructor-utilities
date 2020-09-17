import React from "react";

import {
    Form as FormCollection,
    Button
} from "react-bulma-components";

import Icon from "../../../../../components/Icon";
import { useDashboardDispatch, getDashboardAction as gda } from "../../../store";
import { EDIT_STUDENT } from "../../../store/actions";
import Dropdown from "../../../../../components/Dropdown";
import { useStudentGroupings } from "../../../utils/student";

const { Input } = FormCollection;

const sortTypes = [
    {
        key: "name:asc",
        label: "By name A to Z",
        icon: "sort-alpha-down"
    },
    {
        key: "name:desc",
        label: "By name Z to A",
        icon: "sort-alpha-up-alt"
    },
    {
        key: "priorityLevel:asc",
        label: "By priority 1 to 10",
        icon: "sort-numeric-down"
    },
    {
        key: "priorityLevel:desc",
        label: "By priority 10 to 1",
        icon: "sort-numeric-up-alt"
    }
];

// const groupTypes = [
//     {
//         key: "staff",
//         label: "Group by staff",
//         icon: "user-friends"
//     },
//     {
//         key: "priority",
//         label: "Group by priorty",
//         icon: "exclamation-circle"
//     }
// ];

const StudentListControls = ( { sort, groupBy, search } ) => {

    const dispatch = useDashboardDispatch();
    const groupTypes = useStudentGroupings().map( ({key, name, icon}) => ({
        key,
        label: `Group by ${name}`,
        icon
    }) );
    const groupLabel = <Icon icon="columns" />
    const sortLabel = <Icon icon={sortTypes.find( ({key}) => key === sort[0] ).icon} />

    return (
        <div className="is-flex mb-5">
            <Button className="is-icon-only-mobile" onClick={() => dispatch(gda(EDIT_STUDENT, null))}>
                <Icon icon="plus-circle" />
                <span>Add Student</span>
            </Button>
            <Input
                className="ml-auto"
                type="text"
                value={search[0]}
                placeholder="Search Name"
                onChange={(e) => search[1](e.target.value)} style={{maxWidth:"135px"}}
            />
            <Dropdown className="ml-2 is-right" label={sortLabel}>
                {sortTypes.map( sortType => {
                    const classes = ["dropdown-item"];

                    if( sortType.key === sort[0] ) classes.push("is-active");

                    return (
                        <Button key={sortType.key} className={classes.join(" ")} size="small" onClick={() => sort[1](sortType.key)}>
                            <Icon icon={sortType.icon} />
                            <span>{sortType.label}</span>
                        </Button>
                    )
                })}
            </Dropdown>
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