import { SET_ACTIVE_MODAL } from "../modalActions";
import { useModalContext } from "../modalStore";

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
};
