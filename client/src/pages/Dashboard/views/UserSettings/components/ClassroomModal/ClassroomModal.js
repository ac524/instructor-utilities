
import { useModalRegistration } from "components/Modal/utils";
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
			<ClassroomModalContent roomId={roomId} afterUpdate={onClose} />
		)
	});
}

/**
 * ClassroomModalButton 
 * @param {object} props
 */
export const ClassroomModalButton = ({ children, ...props }) => {
	return (
		<ModalButton {...props} modalKey={modalKey}>
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
