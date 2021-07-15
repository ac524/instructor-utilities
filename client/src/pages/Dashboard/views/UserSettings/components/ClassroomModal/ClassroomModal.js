
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
export const useClassroomModal = ( { roomId, onClose } ) => {
    useModalRegistration(modalKey, {
		key: modalKey,
		roomId: roomId,
		component: () => <ClassroomModalContent modalKey = {modalKey}afterUpdate={onClose} />
	});
}

/**
 * ClassroomModalButton 
 * @param {object} props
 */
export const ClassroomModalButton = ({ children, roomId, ...props }) => {
	const updateRoomKey = useUpdateRoomKey(modalKey,roomId);

	return (
		<ModalButton {...props} modalKey={modalKey} onEdit={() => updateRoomKey()}>
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

