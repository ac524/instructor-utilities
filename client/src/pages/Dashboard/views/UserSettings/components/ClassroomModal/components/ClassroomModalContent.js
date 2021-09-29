import ClassroomForm from "./ClassroomForm.js";

import { Box, Heading } from "react-bulma-components";
import { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import api from "utils/api.js";
import { useOpenModal } from "components/Modal/utils.js";

const ClassroomModalContent = ({ roomId }) => {

	const [room, setRoom] = useState(null);

	const closeModal = useOpenModal( false );

	useEffect(async () => {
		setRoom( (await api.getClassroom(roomId)).data );
	}, []);

	return (
		<Box>
			<Heading renderAs="h2">Classroom</Heading>
			<hr />
			<ClassroomForm room={room} afterUpdate={closeModal} />
		</Box>
	);
};

export default ClassroomModalContent;
