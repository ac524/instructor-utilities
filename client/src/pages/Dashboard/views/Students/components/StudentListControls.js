import React from "react";

import {
    Button
} from "react-bulma-components";

import Icon from "../../../../../components/Icon";
import { useDashboardDispatch, getDashboardAction as gda } from "../../../store";
import { EDIT_STUDENT } from "../../../store/actions";
import Dropdown from "../../../../../components/Dropdown";

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
]

function StudentListControls( { sort } ) {

    const dispatch = useDashboardDispatch();

    const groupLabel = <Icon icon="columns" />
    const sortLabel = <Icon icon={sortTypes.find( ({key}) => key === sort[0] ).icon} />

    return (
        <div className="is-flex mb-5">
            <Button outlined color="primary" onClick={() => dispatch(gda(EDIT_STUDENT, null))}>
                <Icon icon="plus-circle" />
                <span>Add Student</span>
            </Button>
            <Dropdown className="ml-auto is-right" label={sortLabel}>
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
                <Button className="dropdown-item" size="small">
                    <Icon icon="user-friends" />
                    <span>Group by staff</span>
                </Button>
                <Button className="dropdown-item" size="small">
                    <Icon icon="exclamation-circle" />
                    <span>Group by priorty</span>
                </Button>
            </Dropdown>
        </div>
                    
    );

}

export default StudentListControls;