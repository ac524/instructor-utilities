
import { useModalRegistration } from "components/Modal/utils";
import ClassroomModalContent from "./components/ClassroomModalContent";

export const useClassroomModal = ( { roomId=false, onClose } ) => {
    
    const modalKey = "CLASSROOM_MODAL"
    useModalRegistration(modalKey, {
		key: modalKey,
		component: () => (
			<ClassroomModalContent roomId={roomId} afterUpdate={onClose} />
		)
	});
}
