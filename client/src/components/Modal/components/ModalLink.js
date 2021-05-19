import { useOpenModal } from "utils/modalHooks";

/**
 * Open modal link component. Requires <ModalProvider> as an ancenstor.
 * @param {object} props
 */
export const ModalLink = ({ children, onClick, modalKey, ...props }) => {
	// Consume the login context to fetch the live state

	const openModal = useOpenModal(modalKey);

	const onLinkClick = () => {
		onClick ? onClick(openModal) : openModal();
	};

	return (
		<a role="button" onClick={onLinkClick} {...props}>
			{children || "Launch Modal"}
		</a>
	);
};
