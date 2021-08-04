
import { useModalRegistration, useUpdateRoomKey } from "components/Modal/utils";
import ClassroomModalContent from "./components/ClassroomModalContent";
import { ModalButton, ModalLink } from "../../../../../../components/Modal";
import { useState, useEffect } from "react";
import api from "utils/api";

const modalKey = "CLASSROOM_MODAL";
/**
 * useClassroomModal hook 
 * @param {object} props
 */
const useClassroomModal = ({ afterUpdate }) => {
	useModalRegistration(modalKey, {
		key: modalKey,
		namespace: "dashboard",
		component: () => (
			<ClassroomModalContent
				modalKey={modalKey}
				afterUpdate={afterUpdate}
			/>
		)
	});
};

/**
 * ClassroomModalButton 
 * @param {object} props
 */
export const ClassroomModalButton = ({ children, onEdit, ...props }) => {

	return (
		<ModalButton {...props} modalKey={modalKey} onEdit={onEdit}>
			{children}
		</ModalButton>
	);
};

/**
 * ClassroomModalLink 
 * @param {object} props
 */
export const ClassroomModalLink = ({ children, ...props }) => {
	return (
		<ModalLink {...props} modalKey={modalKey}>
			{children}
		</ModalLink>
	);
};

export const useClassroomModalLoader = (roomId) => {
	const [room, setRoom] = useState();

	useEffect(() => {
		if (false === roomId) {
			setRoom(null);
			return;
		}

		if (!roomId) {
			setRoom({ name: "" });
		} else {
			const getRoom = async () =>
				setRoom((await api.getClassroom(roomId)).data);

			try {
				getRoom();
			} catch (err) {
				// TODO error handling
				console.log(err);
			}
		}

		return () => setRoom(null);
	}, [roomId, setRoom]);

	return room;
};

export default useClassroomModal;