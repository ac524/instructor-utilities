import ClassroomForm from "./ClassroomForm.js";

import { Box, Heading } from "react-bulma-components";
import { useModalContext } from "components/Modal/store/index.js";
import { useClassroomModalLoader } from "../ClassroomModal.js";

const ClassroomModalContent = ({ modalKey, onClose }) => {

    const [ modalState ] = useModalContext();

	const room = useClassroomModalLoader(modalState.modals[modalKey].roomId);

	return (
        <Box>
            <Heading renderAs="h2">Classroom</Heading>
            <hr />
            <ClassroomForm room={room} afterUpdate={onClose} />
        </Box>
	);
};

export default ClassroomModalContent;
