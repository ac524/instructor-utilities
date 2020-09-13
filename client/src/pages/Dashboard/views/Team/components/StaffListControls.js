import React, { useState } from "react";

import {
    Button
} from "react-bulma-components";

import Icon from "../../../../../components/Icon";
import InviteModal from "./InviteModal";

function StaffListControls() {

    const [ showInvite, setShowInvite ] = useState(false);

    return (
        <div className="staff-list-ctrls">
            <div className="is-flex mb-5">
                <Button className="is-icon-only-mobile" onClick={()=>setShowInvite(true)}>
                    <Icon icon="plus-circle" />
                    <span>Invite TA</span>
                </Button>
            </div>
            <InviteModal show={showInvite} onClose={() => setShowInvite(false)} />
        </div>
    );

}

export default StaffListControls;