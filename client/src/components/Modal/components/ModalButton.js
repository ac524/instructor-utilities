import { useModalContext } from "../modalStore";
import { Button } from "react-bulma-components";
import { SET_ACTIVE_MODAL } from "../modalActions";
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
