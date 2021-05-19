import { useContext, createContext, useReducer } from "react";

import {
    Modal as BulmaModal,
    Button
} from "react-bulma-components";
import { SET_ACTIVE_MODAL } from "./modalActions";

import reducer from "./modalReducer";

// Define a new context
const ModalContext = createContext(false);

// Deconstruct the provider for ease of use in JSX
const { Provider } = ModalContext;

export const useModalContext = () => {

    return useContext( ModalContext );
    
}

/**
 * Modal provider component.
 * @param {object} props 
 */
export const ModalProvider = ({children, isActive = false}) => {

    // Create the reducer state.
     const [modalState, modalDispatch] = useReducer(reducer, { 
            modals: { } , 
            activeKey: "" 
        } )
    
    //const modalState = useState( isActive );

    return <Provider value={[modalState, modalDispatch]}>{children}</Provider>;

}

/**
 * Open modal button component. Requires <ModalProvider> as an ancenstor.
 * @param {object} props
 */
export const ModalButton = ({ children, modalKey, ...props }) => {
	// Consume the login context to fetch the live state.
    const [, modalDispatch] = useModalContext();

    const open = () =>
		modalDispatch({
			type: SET_ACTIVE_MODAL,
			payload: modalKey
		});

	return (
		<Button onClick={() => open()} {...props}>
			{children || "Launch Modal"}
		</Button>
	);
};

/**
 * Open modal link component. Requires <ModalProvider> as an ancenstor.
 * @param {object} props
 */
export const ModalLink = ({ children, onClick, modalKey, ...props }) => {
	// Consume the login context to fetch the live state.

	const [, modalDispatch] = useModalContext();

	const open = () =>
		modalDispatch({
			type: SET_ACTIVE_MODAL,
			payload: modalKey
		});

	const onLinkClick = () => {
		onClick ? onClick(open) : open();
	};

	return (
		<a role="button" onClick={onLinkClick} {...props}>
			{children || "Launch Modal"}
		</a>
	);
};;

const Modal = ( { children, onClose, contentProps = {}, ...props } ) => {


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

export default Modal;