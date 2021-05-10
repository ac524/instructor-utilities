
import {
    Button
} from "react-bulma-components";

import Dropdown from "components/Dropdown";
import Icon from "components/Icon";

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

const SortSelectDropdown = ( { state: [ value, set ], ...props } ) => {

    return (
        <Dropdown label={<Icon icon={sortTypes.find( ({key}) => key === value ).icon} />} {...props}>
            {sortTypes.map( sortType => {
                const classes = ["dropdown-item"];

                if( sortType.key === value ) classes.push("is-active");

                return (
                    <Button key={sortType.key} className={classes.join(" ")} size="small" onClick={() => set(sortType.key)}>
                        <Icon icon={sortType.icon} />
                        <span>{sortType.label}</span>
                    </Button>
                )
            })}
        </Dropdown>
    )

}

export default SortSelectDropdown;