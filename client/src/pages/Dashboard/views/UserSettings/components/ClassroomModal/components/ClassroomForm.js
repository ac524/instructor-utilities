import api from "utils/api";
import Form from "components/Form";
import Pulse from "components/Pulse";
import { createValidator } from "utils/validation";
import { useStoreDispatch, getStoreAction as gsa } from "store";
import { ADD_USER_ROOM_ID, REFRESH_USER_ROOMS } from "store/actions";

const validateClassroomData = createValidator({
	validators: {
		name: ({ name }) => Boolean(name) || "Classroom name is required"
	}
});

const ClassroomForm = ({ room, afterUpdate }) => {
	const dispatch = useStoreDispatch();

	const handleSubmit = async (data, setErrors) => {
		const updateList = Object.entries(data).filter(
			([key, value]) => value !== room[key]
		);

		if (updateList.length) {
			const updates = Object.fromEntries(updateList);

			try {
				if (!room._id) {
					const { data } = await api.createClassroom(updates);
					await dispatch(gsa(ADD_USER_ROOM_ID, data._id));
					if (afterUpdate) afterUpdate();

					return;
				}

				await api.updateClassroom(room._id, updates);
				dispatch(gsa(REFRESH_USER_ROOMS));
				if (afterUpdate) afterUpdate();
			} catch (err) {
				if (err.response) setErrors(err.response.data);
			}
		}
	};

	return room ? (
		<Form
			flat
			fields={[
				{
					label: "Name",
					name: "name",
					placeholder: "Name of Classroom",
					value: room.name
				}
			]}
			fieldValueSource={room}
			validation={validateClassroomData}
			onSubmit={handleSubmit}
		/>
	) : (
		<Pulse />
	);
};

export default ClassroomForm;