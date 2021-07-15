import { useState } from "react";

import {
    Panel,
    Heading,
    Button,
    Tag
} from "react-bulma-components";

import {CopyToClipboard} from 'react-copy-to-clipboard';

import Icon from "components/Icon";
import api from "utils/api";
import { useClassroom, useDashboardDispatch, getDashboardAction as gda } from "pages/Dashboard/store";
import { DELETE_INVITE } from "pages/Dashboard/store/actionsNames";
import { useSocket } from "utils/socket.io";
import { ModalButton } from "components/Modal";
import { useModalRegistration } from "components/Modal/utils";

const modalKey = "PENDING_MODAL"

export const PendingInvitesModalButton = () => {

    const { invites } = useClassroom();

    return (
        <ModalButton  color="warning" className="has-border-1 is-light ml-2 is-icon-only-mobile" modalKey={modalKey}>
            <span className="icon">{invites.length}</span>
            <span>Pending Invites</span>
        </ModalButton>
    );

}

export const CopyLinkButton = ( {token} ) => {

    const [ isCopied, setIsCopied ] = useState(false);

    const notify = () => {

        setIsCopied(true);

        setTimeout(()=>setIsCopied(false),2500);

    }

    return (
        <CopyToClipboard text={`${window.location.origin}/invite/${token}`} onCopy={notify}>
            <Button size="small" className="ml-2 is-icon-only-mobile" color={isCopied ? "success" : null}>
                <Icon icon={isCopied ? "check" : "link"} />
                <span>{isCopied ? "Copied" : "Link"}</span>
            </Button>
        </CopyToClipboard>
    );

}

export const usePendingInvitesModal = (roomId,invites) => {
	useModalRegistration(modalKey, {
		key: modalKey,
		component: () => (
			<PendingInvitesModalContent roomId={roomId} invites={invites} />
		)
	});
};

const PendingInvitesModalContent = ({ roomId, invites }) => {
	const dispatch = useDashboardDispatch();

	const socket = useSocket();

	const deleteInvite = async (inviteId) => {
		try {
			await api.deleteInvite(roomId, inviteId);

			const dispatchData = gda(DELETE_INVITE, inviteId);
			dispatch(dispatchData);
			socket.emit(`${roomId}:dispatch`, dispatchData);
		} catch (err) {
			// TODO Error handling
		}
	};

	return (
        <Panel
            className="has-background-white is-shadowless"
            renderAs="div">
            <Heading renderAs="h2" className="is-primary">
                Pending Invites
            </Heading>
            {invites.map((invite) => (
                <Panel.Block key={invite._id}>
                    <span className="has-overflow-ellipsis mw-60">
                        {invite.email}
                    </span>
                    <span className="ml-auto">
                        {invite.token ? (
                            <Tag color="warning">Pending</Tag>
                        ) : (
                            <Tag color="danger">Expired</Tag>
                        )}
                        {invite.token && (
                            <CopyLinkButton
                                token={invite.token.tokenString}
                            />
                        )}
                        {/* <Button size="small" className="ml-2 is-icon-only-mobile"><Icon icon="paper-plane" /><span>Resend</span></Button> */}
                        <Button
                            size="small"
                            className="ml-2 is-icon-only-mobile"
                            onClick={() => deleteInvite(invite._id)}>
                            <Icon icon="ban" />
                            <span>Revoke</span>
                        </Button>
                    </span>
                </Panel.Block>
            ))}
        </Panel>

	);
};
