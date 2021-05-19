import {
    Modal as BulmaModal,
} from "react-bulma-components";
import { SET_ACTIVE_MODAL } from "../modalActions";
import { useModalContext } from "../modalStore";


export const Modal = ( { children, onClose, contentProps = {}, ...props } ) => {


    const [modal, modalDispatch] = useModalContext();

	const { component: Component } = (
		modal.modals[modal.activeKey] ? 
			modal.modals[modal.activeKey]: 
			false
		)

    const isActive = () => modal.activeKey

    const close = () => modalDispatch({
			type: SET_ACTIVE_MODAL,
			payload: false
		});

    const onModalClose = () => {
        onClose ? onClose( close ) : close();
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
