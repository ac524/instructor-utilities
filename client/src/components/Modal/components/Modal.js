import {
    Modal as BulmaModal,
} from "react-bulma-components";
import { SET_ACTIVE_MODAL } from "../modalActions";
import { useModalContext } from "../modalStore";


export const Modal = ( { children, onClose, contentProps = {}, ...props } ) => {


    const [modal, modalDispatch] = useModalContext();


    const isActive = () => modal.activeKey !== modal.activeKey;

    const close = () => modalDispatch({
			type: SET_ACTIVE_MODAL,
			payload: ""
		});

    const onModalClose = () => {
        onClose ? onClose( close ) : close();
    }

    return (
        <BulmaModal show={isActive()} onClose={onModalClose} closeOnBlur={true} {...props}>
            <BulmaModal.Content {...contentProps}>
                {children}
            </BulmaModal.Content>
        </BulmaModal>
    )

}
