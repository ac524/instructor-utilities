import React, { useState } from "react";

import {
    Modal,
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

export const usePendingInvitesModalState = () => {

    const [ isActive, setIsActive ] = useState(false);

    return {
        isActive,
        open: () => setIsActive( true ),
        close: () => setIsActive( false )

    }

}

export const PendingInvitesModalButton = ({ open }) => {

    const { invites } = useClassroom();

    return (
        <Button color="warning" className="has-border-1 is-light ml-2 is-icon-only-mobile" onClick={open}>
            <span className="icon">{invites.length}</span>
            <span>Pending Invites</span>
        </Button>
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

const PendingInvitesModal = ( { show, onClose } ) => {

    const dispatch = useDashboardDispatch();
    const { _id, invites } = useClassroom();
    const socket = useSocket();

    const deleteInvite = async ( inviteId ) => {

        try {

            await api.deleteInvite( _id, inviteId );

            const dispatchData = gda(DELETE_INVITE, inviteId);
            dispatch(dispatchData);
            socket.emit( `${_id}:dispatch`, dispatchData );

        } catch(err) {

            // TODO Error handling

        }

    }

    return (
        <Modal
            show={show}
            onClose={onClose}
            closeOnBlur={true}
            >
            <Modal.Content>
                <Panel className="has-background-white is-shadowless" renderAs="div">
                    <Heading renderAs="h2" className="is-primary">Pending Invites</Heading>
                    {invites.map( invite => (
                        <Panel.Block key={invite._id}>
                            <span className="has-overflow-ellipsis mw-60">{invite.email}</span>
                            <span className="ml-auto">
                                {invite.token ? <Tag color="warning">Pending</Tag> : <Tag color="danger">Expired</Tag>}
                                {invite.token && <CopyLinkButton token={invite.token.token} />}
                                {/* <Button size="small" className="ml-2 is-icon-only-mobile"><Icon icon="paper-plane" /><span>Resend</span></Button> */}
                                <Button size="small" className="ml-2 is-icon-only-mobile" onClick={()=>deleteInvite(invite._id)}><Icon icon="ban" /><span>Revoke</span></Button>
                            </span>
                        </Panel.Block>
                    ))}
                </Panel>
            </Modal.Content>
        </Modal>
    );

}

export default PendingInvitesModal;