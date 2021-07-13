import { useState, useEffect } from "react";

export const useClassroomModalLoader = (roomId) => {
	const [room, setRoom] = useState();

	useEffect(() => {
		if (false === roomId) {
			setRoom(null);
			return;
		}

		if (!roomId) {
			setRoom({ name: "" });
		} else {
			const getRoom = async () =>
				setRoom((await api.getClassroom(roomId)).data);

			try {
				getRoom();
			} catch (err) {
				// TODO error handling
				console.log(err);
			}
		}

		return () => setRoom(null);
	}, [roomId, setRoom]);

	return room;
};
