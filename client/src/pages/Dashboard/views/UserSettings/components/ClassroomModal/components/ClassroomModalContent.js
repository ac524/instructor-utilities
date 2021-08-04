import ClassroomForm from "./ClassroomForm.js";

import { Box, Heading } from "react-bulma-components";
import { useClassroomModalLoader } from "../index.js";

const ClassroomModalContent = ({ afterUpdate }) => {

	const room = useClassroomModalLoader();

	return (
		<Box>
			<Heading renderAs="h2">Classroom</Heading>
			<hr />
			<ClassroomForm room={room} afterUpdate={afterUpdate} />
		</Box>
	);
};

export default ClassroomModalContent;
