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
import { useDashboardDispatch, getDashboardAction as gda } from "pages/Dashboard/store";
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

export const InviteModalButton = ({ icon = "plus-circle", children }) => {

    return (
		<ModalButton className="is-icon-only-mobile" modalKey={modalKey}>
			<Icon icon={icon} />
			<span>{children || "Invite TA"}</span>
		</ModalButton>
	);

}

export const useInviteModal = (roomId) => {
	useModalRegistration(modalKey, {
		key: modalKey,
		component: () => <InviteModalContent roomId={roomId} />
	});
};

const InviteModalContent = ({ roomId }) => {
	const dispatch = useDashboardDispatch();
	const socket = useSocket();

	const handleSubmit = async (data, setErrors) => {
		try {
			const { data: invite } = await api.createInvite(roomId, data);

			const dispatchData = gda(ADD_INVITE, invite);
			dispatch(dispatchData);
			socket.emit(`${roomId}:dispatch`, dispatchData);

		} catch (err) {
			if (err.response && err.response.data) setErrors(err.response.data);
			// console.log(err);
		}
	};

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
						type: "text"
					}
				]}
				onSubmit={handleSubmit}
				validation={validateInviteData}
				buttonText="Send Invite"
			/>
		</Box>
	);
};
