import { useModalContext } from "components/Modal/store";
import { useClassroom } from "pages/Dashboard/store";
import { useState } from "react";
import { InviteModalButton, useInviteModal } from "./InviteModal";
import { PendingInvitesModalButton, usePendingInvitesModal } from "./PendingInvitesModal";

const StaffListControls = () => {
    const room = useClassroom();
    
    usePendingInvitesModal();

    useInviteModal();
    
    return (
        <div className="staff-list-ctrls">
            <div className="is-flex mb-5">
                <InviteModalButton/>
                { room.invites.length ? <PendingInvitesModalButton/> : null }
            </div>
        </div>
    );

}

export default StaffListControls;