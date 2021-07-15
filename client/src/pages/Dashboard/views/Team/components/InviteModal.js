import { useState } from "react";

import {
    Modal,
    Box,
    Heading,
    Button
} from "react-bulma-components";

import Icon from "components/Icon";
import Form from "components/Form";
import { createValidator } from "utils/validation";
import api from "utils/api";
import { useClassroom, useDashboardDispatch, getDashboardAction as gda } from "pages/Dashboard/store";
import { ADD_INVITE } from "pages/Dashboard/store/actionsNames";
import { useSocket } from "utils/socket.io";
import { ModalButton } from "components/Modal";
import { useModalRegistration } from "components/Modal/utils";


const modalKey = "INVITE_MODAL";

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

export const InviteModalButton = ({ icon = "plus-circle", children }) => {

    return (
		<ModalButton className="is-icon-only-mobile" modalKey={modalKey}>
			<Icon icon={icon} />
			<span>{children || "Invite TA"}</span>
		</ModalButton>
	);

}

export const useInviteModal = () =>{
     useModalRegistration(modalKey, {
			key: modalKey,
			component: () => (<InviteModalContent/>)
		});
}

const InviteModalContent = () => {

    const dispatch = useDashboardDispatch();
    const socket = useSocket();

    const { _id } = useClassroom();

    const handleSubmit = async ( data, setErrors ) => {

        try {

            const { data: invite } = await api.createInvite( _id, data );

            const dispatchData = gda(ADD_INVITE, invite);
            dispatch(dispatchData);
            socket.emit( `${_id}:dispatch`, dispatchData );

            onInviteCreated && onInviteCreated();

            onClose && onClose();

        } catch(err) {

            if( err.response && err.response.data ) setErrors(err.response.data);
            // console.log(err);

        }

    }

    return (
        <Box className="py-5">
            <Heading renderAs="h2">Invite TA</Heading>
            <hr />
            <Form
                flat
                fields={[
                    {
                        label: "Email",
                        placeholder: "Provide an email to invite",
                        name: "email",
                        type: "text",
                    }
                ]}
                onSubmit={handleSubmit}
                validation={validateInviteData}
                buttonText="Send Invite"
            />
        </Box>
    );
}
