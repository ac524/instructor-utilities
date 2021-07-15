import ClassroomForm from "./ClassroomForm.js";

import { Box, Heading } from "react-bulma-components";
import { useClassroomModalLoader } from "../utils/useClassroomModalLoader.js";

const ClassroomModalContent = ({ roomId , onClose }) => {

	const room = useClassroomModalLoader(roomId);

	return (
        <Box>
            <Heading renderAs="h2">Classroom</Heading>
            <hr />
            <ClassroomForm room={room} afterUpdate={onClose} />
        </Box>
	);
};

export default ClassroomModalContent;
