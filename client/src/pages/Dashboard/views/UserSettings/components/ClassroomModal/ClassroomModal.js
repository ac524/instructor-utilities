import Form from "components/Form";
import { createValidator } from "utils/validation";
import Pulse from "components/Pulse";

import {
    Modal,
    Box,
    Heading
} from "react-bulma-components";

import { useStoreDispatch, getStoreAction as gsa } from "store";
import { REFRESH_USER_ROOMS, ADD_USER_ROOM_ID } from "store/actions";

import api from "utils/api";

import { useClassroomModalLoader } from "./utils/useClassroomModalLoader";

const validateClassroomData = createValidator({
    validators: {
        name: ({ name }) => Boolean(name) || "Classroom name is required",
    }
});

export const ClassroomForm = ({ room, afterUpdate }) => {

    const dispatch = useStoreDispatch();

    const handleSubmit = async (data, setErrors) => {


        const updateList = Object.entries(data).filter( ([key,value]) => value !== room[key] );

 

        if( updateList.length ) {

            const updates = Object.fromEntries( updateList );

            try {

                if(!room._id){
                    
                    const { data } = await api.createClassroom(updates);
                    await dispatch(gsa(ADD_USER_ROOM_ID, data._id));
                    if (afterUpdate) afterUpdate();

                    return
                }

                await api.updateClassroom( room._id, updates );
                dispatch(gsa( REFRESH_USER_ROOMS ))
                if( afterUpdate ) afterUpdate();

            } catch(err) {

                if( err.response ) setErrors( err.response.data );

            }

        }

    }

    return room
    
        ? <Form
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

        : <Pulse />;

}

const ClassroomModal = ( { roomId=false, onClose } ) => {
    
    const room = useClassroomModalLoader( roomId );
    return (
        <Modal
            show={false !== roomId}
            closeOnBlur={true}
            onClose={onClose}
            >
            <Modal.Content>
                <Box>
                    <Heading renderAs="h2">Classroom</Heading>
                    <hr />
                    <ClassroomForm room={room} afterUpdate={onClose} />
                </Box>
            </Modal.Content>
        </Modal>
    );

}

export default ClassroomModal;