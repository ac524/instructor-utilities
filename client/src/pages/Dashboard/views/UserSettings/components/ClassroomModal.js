import Form, { createValidator } from "components/Form";
import Pulse from "components/Pulse";
import React, { useEffect, useState } from "react";

import {
    Modal,
    Box,
    Heading
} from "react-bulma-components";

import { useStoreDispatch, getStoreAction as gsa } from "store";
import { REFRESH_USER_ROOMS } from "store/actions";

import api from "utils/api";

const validateClassroomData = createValidator({
    validators: {
        name: ({ name }) => Boolean(name) || "Classroom name is required",
    }
});

export const useClassroomFields = (room) => {

    const [ fields, setFields ] = useState([]);
    const [ state, setState ] = useState({});

    useEffect(() => {

        if(!room) {
            setState({});
            return;
        }

        setState({
            name: room.name
        }); 

    }, [room, setState]);

    useEffect(() => {

        const onChange = e => setState({ ...state, [e.target.name]: e.target.value });

        setFields([
            {
                label: "Name",
                onChange,
                value: state.name,
                name: "name"
            }
        ])

    }, [state, setState, setFields]);

    return [ fields, state ];

}

export const useClassroomModalLoader = (roomId) => {

    const [ room, setRoom ] = useState();

    useEffect(() => {

        if( false === roomId ) {
            setRoom(null);
            return;
        }

        if( !roomId ) {

            setRoom({});

        } else {

            const getRoom = async () => setRoom( (await api.getClassroom( roomId )).data );

            try {

                getRoom();

            } catch(err) {

                // TODO error handling
                console.log(err);

            }

        }

        return () => setRoom(null);

    }, [ roomId, setRoom ]);

    return room;

}

export const ClassroomForm = ({ room, afterUpdate }) => {

    const [ fields, values ] = useClassroomFields( room );
    const [ errors, setErrors ] = useState();
    const dispatch = useStoreDispatch();

    const handleSubmit = async e => {

        e.preventDefault();

        const updateList = Object.entries(values).filter( ([key,value]) => value !== room[key] );

        if( updateList.length ) {

            const updates = Object.fromEntries( updateList );

            const [data, errors, hasErrors] = validateClassroomData( updates );

            if(hasErrors) {
                setErrors(errors);
                return
            }

            try {

                await api.updateClassroom( room._id, data );
                dispatch(gsa( REFRESH_USER_ROOMS ))
                if( afterUpdate ) afterUpdate();

            } catch(err) {

                if( err.response ) setErrors( err.response.data );

            }

        }

    }

    return room ? <Form flat fields={fields} onSubmit={handleSubmit} errors={errors} /> : <Pulse />;

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