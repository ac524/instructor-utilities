
import { useClassroom } from "pages/Dashboard/store";
import InviteModal, { InviteModalButton, useInviteModalState } from "./InviteModal";
import { PendingInvitesModalButton, usePendingInvitesModal } from "./PendingInvitesModal";

const StaffListControls = () => {

    const room = useClassroom();
    const invite = useInviteModalState();
    
    usePendingInvitesModal();

    const onInviteCreated = () => {
        pendingInvites.open();
    }

    return (
        <div className="staff-list-ctrls">
            <div className="is-flex mb-5">
                <InviteModalButton open={invite.open} />
                { room.invites.length ? <PendingInvitesModalButton/> : null }
            </div>
            <InviteModal show={invite.isActive} onClose={invite.close} onInviteCreated={onInviteCreated} />
        </div>
    );

}

export default StaffListControls;