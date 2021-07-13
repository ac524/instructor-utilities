
import ClassroomForm from "./components/ClassroomForm.js"

import {
    Modal,
    Box,
    Heading
} from "react-bulma-components";



import { useClassroomModalLoader } from "./utils/useClassroomModalLoader";



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