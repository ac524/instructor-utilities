import {
    Modal as BulmaModal,
} from "react-bulma-components";
import { useOpenModal } from "components/Modal/utils";
import { useModalContext } from "../store";
import { useMemo } from "react";


export const Modal = ( { namespace = "default", onClose, contentProps = {}, ...props } ) => {

    const [ modal, ] = useModalContext();
	const { modals, activeKey } = modal;

	const isActive = useMemo(() => modals[activeKey] && modals[activeKey].namespace === namespace, [activeKey]);
	
	const {
		component: Component,
		props: componentProps = {}
	} = (
		isActive
			? modals[activeKey]
			: {}
	);

    const closeModal = useOpenModal(false);

    const onModalClose = () => {
        onClose ? onClose(closeModal) : closeModal();
    }

    return (
		<BulmaModal
			show={isActive}
			onClose={onModalClose}
			closeOnBlur={true}
			{...props}>
			<BulmaModal.Content {...contentProps}>
				{ Component  && <Component { ...componentProps } />}
			</BulmaModal.Content>
		</BulmaModal>
	);

}
