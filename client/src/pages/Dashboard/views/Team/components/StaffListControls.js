
import { useClassroom } from "pages/Dashboard/store";
import InviteModal, { InviteModalButton, useInviteModal, useInviteModalState } from "./InviteModal";
import PendingInvitesModal, { usePendingInvitesModalState, PendingInvitesModalButton } from "./PendingInvitesModal";

const StaffListControls = () => {

    const room = useClassroom();
    const invite = useInviteModalState();
    const pendingInvites = usePendingInvitesModalState();

    useInviteModal(room._id)

    return (
        <div className="staff-list-ctrls">
            <div className="is-flex mb-5">
                <InviteModalButton open={invite.open} />
                { room.invites.length ? <PendingInvitesModalButton open={pendingInvites.open} /> : null }
            </div>
            { room.invites.length ? <PendingInvitesModal show={pendingInvites.isActive} onClose={pendingInvites.close} /> : null }
        </div>
    );

}

export default StaffListControls;