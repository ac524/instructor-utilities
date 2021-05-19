import {
    Modal as BulmaModal,
} from "react-bulma-components";
import { useOpenModal } from "utils/modalHooks";
import { useModalContext } from "../modalStore";


export const Modal = ( { children, onClose, contentProps = {}, ...props } ) => {


    const [ modal, ] = useModalContext();
	const { modals, activeKey } = modal
	
	const { component: Component } = (
		modals[activeKey] ? 
			modals[activeKey]: 
			false
		)

    const isActive = () => activeKey

    const closeModal = useOpenModal(false);

    const onModalClose = () => {
        onClose ? onClose(closeModal) : closeModal();
    }

    return (
		<BulmaModal
			show={isActive()}
			onClose={onModalClose}
			closeOnBlur={true}
			{...props}>
			<BulmaModal.Content {...contentProps}>
				{ Component ? <Component /> : children}
			</BulmaModal.Content>
		</BulmaModal>
	);

}
