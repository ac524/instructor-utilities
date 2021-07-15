
import { useModalRegistration, useUpdateRoomKey } from "components/Modal/utils";
import ClassroomModalContent from "./components/ClassroomModalContent";
import { ModalButton, ModalLink } from "../../../../../../components/Modal";

const modalKey = "CLASSROOM_MODAL";
/**
 * useClassroomModal hook 
 * @param {object} props
 */
export const useClassroomModal = ( { roomId, onClose } ) => {
    useModalRegistration(modalKey, {
		key: modalKey,
		roomId: roomId,
		component: () => (
			<ClassroomModalContent modalKey={modalKey} afterUpdate={onClose} />
		)
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
