import React, { useState } from "react";

import {
    Modal,
    Box,
    Heading,
    Button
} from "react-bulma-components";

import Icon from "components/Icon";
import Form, { createValidator } from "components/Form";
import api from "utils/api";
import { useClassroom, useDashboardDispatch, getDashboardAction as gda } from "pages/Dashboard/store";
import { ADD_INVITE } from "pages/Dashboard/store/actions";
import { useSocket } from "utils/socket.io";

const validateInviteData = createValidator({
    validators: {
        email: ({ email }) => Boolean(email) || "Email is required"
    }
});

export const useInviteModalState = () => {

    const [ isActive, setShowInvite ] = useState(false);

    return {
        isActive,
        open: () => setShowInvite( true ),
        close: () => setShowInvite( false )

    }

}

export const InviteModalButton = ({ icon = "plus-circle", open, children }) => {

    return (
        <Button className="is-icon-only-mobile" onClick={open}>
            <Icon icon={icon} />
            <span>{ children || "Invite TA" }</span>
        </Button>
    );

}

const InviteModal = ( { show, onClose, onInviteCreated } ) => {

    const dispatch = useDashboardDispatch();
    const { _id } = useClassroom();
    const [ email, setEmail ] = useState("");
    const [ errors, setErrors ] = useState({});
    const socket = useSocket();

    const fields = [
        {
            label: "Email",
            placeholder: "Provide an email to invite",
            name: "email",
            type: "text",
            value: email,
            onChange: e => setEmail(e.target.value)
        }
    ];

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const [ data, errors, hasErrors ] = validateInviteData({ email });

            if(hasErrors) {
                setErrors(errors);
                return
            }

            if(Object.keys(errors).length) setErrors({});

            const { data: invite } = await api.createInvite( _id, data );

            const dispatchData = gda(ADD_INVITE, invite);
            dispatch(dispatchData);
            socket.emit( `${_id}:dispatch`, dispatchData );

            onInviteCreated && onInviteCreated();

            onClose && onClose();

        } catch(err) {

            if( err.response && err.response.data ) setErrors(err.response.data);
            console.log(err);

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
                    <Heading renderAs="h2">Invite TA</Heading>
                    <hr />
                    <Form flat fields={fields} onSubmit={handleSubmit} errors={errors} buttonText="Send Invite" />
                </Box>
            </Modal.Content>
        </Modal>
    );

}

export default InviteModal;