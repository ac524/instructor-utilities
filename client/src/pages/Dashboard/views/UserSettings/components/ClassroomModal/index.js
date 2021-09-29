
import { useModalRegistration, useOpenModal } from "components/Modal/utils";
import ClassroomModalContent from "./components/ClassroomModalContent";
import { ModalLink } from "components/Modal";

const modalKey = "CLASSROOM_MODAL";
/**
 * useClassroomModal hook 
 * @param {object} props
 */
export const useClassroomModalRegistration = () => {
	useModalRegistration(modalKey, {
		key: modalKey,
		namespace: "dashboard",
		component: ClassroomModalContent
	});
};

export const useOpenClassroomModal = () => {
	return useOpenModal( modalKey );
}

/**
 * ClassroomModalButton 
 * @param {object} props
 */
export const ClassroomModalButton = ({ children, ...props }) => {
	return (
		<Button {...props} modalKey={modalKey}>
			{children}
		</Button>
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