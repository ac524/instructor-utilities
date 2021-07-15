import { Button } from "react-bulma-components";
import { useOpenModal } from "components/Modal/utils";
/**
 * Open modal button component. Requires <ModalProvider> as an ancenstor.
 * @param {object} props
 */
export const ModalButton = ({ children, modalKey, onEdit, ...props }) => {
	// Consume the login context to fetch the live state.
    const openModal = useOpenModal(modalKey);
	const handleClick = () =>{
		openModal();

		if(onEdit){
			onEdit()
		}
	}
	return (
		<Button onClick={() => handleClick()} {...props}>
			{children || "Launch Modal"}
		</Button>
	);
};
