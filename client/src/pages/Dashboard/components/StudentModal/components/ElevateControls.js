import Icon from "components/Icon";
import { useStaff } from "pages/Dashboard/store";
import React from "react";

import {
    Button
} from "react-bulma-components";
import api from "utils/api";

const ElevateControls = ({ student, ...props }) => {

    const staff = useStaff();

    const firstInstructor = ()=>staff.find(({role})=>role==="instructor");

    const elevate = async () => {

        await api.createElevate( student.feed, { to: firstInstructor().user._id } );
        
    }

    return (
        <span {...props}>
            <Button color="danger" size="small" onClick={elevate}><Icon icon="level-up-alt" /></Button>
        </span>
    )

}

export default ElevateControls;