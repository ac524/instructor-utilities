import React, { useState } from "react";

import {
    Modal,
    Box,
    Heading,
    Button,
    Tag
} from "react-bulma-components";

import Icon from "../../../../../components/Icon";
import api from "../../../../../utils/api";
import { useClassroom, useDashboardDispatch, getDashboardAction as gda } from "../../../store";
import { DELETE_INVITE } from "../../../store/actions";

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

const PendingInvitesModal = ( { show, onClose } ) => {

    const dispatch = useDashboardDispatch();
    const { _id, invites } = useClassroom();

    const deleteInvite = async ( inviteId ) => {

        try {

            await api.deleteInvite( _id, inviteId );

            dispatch(gda(DELETE_INVITE, inviteId));

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
                <Box className="py-5">
                    <Heading renderAs="h2">Pending Invites</Heading>
                    <hr className="mb-0" />
                    <table className="table is-vcentered is-hoverable is-fullwidth">
                        <tbody>
                        {invites.map( invite => (
                            <tr key={invite._id}>
                                <td>{invite.email}</td>
                                <td>{invite.token ? <Tag color="warning">Pending</Tag> : <Tag color="danger">Expired</Tag>}</td>
                                <td><Button className="is-small"><Icon icon="paper-plane" /><span>Resend</span></Button></td>
                                <td><Button className="is-small" onClick={()=>deleteInvite(invite._id)}><Icon icon="ban" /><span>Revoke</span></Button></td>
                            </tr>
                        ) )}
                        </tbody>
                    </table>
                </Box>
            </Modal.Content>
        </Modal>
    );

}

export default PendingInvitesModal;