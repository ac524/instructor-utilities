import { useContext, createContext, useReducer } from "react";
import reducer from "./modalReducer";
// Define a new context
const ModalContext = createContext(false);

// Deconstruct the provider for ease of use in JSX
const { Provider } = ModalContext;

export const useModalContext = () => {
	return useContext(ModalContext);
};

/**
 * Modal provider component.
 * @param {object} props
 */
export const ModalProvider = ({ children, isActive = false }) => {
	// Create the reducer state.
	const [modalState, modalDispatch] = useReducer(reducer, {
		modals: {},
		activeKey: ""
	});

	//const modalState = useState( isActive );

	return <Provider value={[modalState, modalDispatch]}>{children}</Provider>;
};
