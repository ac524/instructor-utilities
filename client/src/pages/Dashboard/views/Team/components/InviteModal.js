import React, { useState } from "react";

import {
    Modal,
    Box,
    Heading
} from "react-bulma-components";

import Form from "../../../../../components/Form";
import api from "../../../../../utils/api";
import { useClassroom } from "../../../store";

const InviteModal = ( { show, onClose } ) => {

    const { _id } = useClassroom();
    const [ email, setEmail ] = useState("");
    const [ errors, setErrors ] = useState({});

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

            if(Object.keys(errors).length) setErrors({});

            const invite = await api.createInvite( _id, { email } );

            console.log( invite );

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
                    <Form fields={fields} onSubmit={handleSubmit} errors={errors} buttonText="Send Invite" />
                </Box>
            </Modal.Content>
        </Modal>
    );

}

export default InviteModal;