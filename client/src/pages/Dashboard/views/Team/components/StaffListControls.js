import React from "react";

import {
    Button
} from "react-bulma-components";

import Icon from "../../../../../components/Icon";

function StaffListControls() {

    return (
        <div className="is-flex mb-5">
            <Button className="is-icon-only-mobile">
                <Icon icon="plus-circle" />
                <span>Invite TA</span>
            </Button>
        </div>
    );

}

export default StaffListControls;