import React, { useState, useEffect } from "react";

import Box from "react-bulma-components/lib/components/box";
import Heading from "react-bulma-components/lib/components/heading";

import Modal, { useModalContext } from "components/Modal";
import Form from "components/Form";

import { useDashboardContext, getDashboardAction as gda, useEditStudent } from "pages/Dashboard/store";
import { UPDATE_STUDENT, ADD_STUDENT, EDIT_STUDENT } from "pages/Dashboard/store/actions";

function EditStudentModal() {

    const [ , dispatch ] = useDashboardContext();
    const [ ,setIsModalActive ] = useModalContext();

    const editStudent = useEditStudent();

    const { _id } = editStudent;

    const [ studentState, setStudent ] = useState( editStudent );

    useEffect(() => {

        setStudent( editStudent );

        if( editStudent._id ) setIsModalActive(true);

    }, [editStudent, setStudent, setIsModalActive]);

    const handleInputUpdate = ( { target: { name, value } } ) => {
        setStudent( { ...studentState, [name]: value } );
    }

    // Student form fields configuration.
    const fields = [
        {
            label: "Student Name",
            placeholder: "Student Name",
            name: "name",
            type: "text",
            value: studentState.name,
            onChange: handleInputUpdate
        },
        {
            label: "Priority",
            placeholder: "Priority",
            name: "priorityLevel",
            type: "number",
            value: studentState.priorityLevel,
            onChange: handleInputUpdate
        }
    ];

    const clearEditStudent = (close) => {
        
        close();
        dispatch(gda(EDIT_STUDENT, undefined));

    }

    const handleSubmit = (e) => {

        e.preventDefault();

        if( _id ) {
            dispatch(gda( UPDATE_STUDENT, {
                _id,
                ...studentState
            } ));
        } else {
            dispatch(gda( ADD_STUDENT, {
                _id: Math.floor(Math.random()*10000),
                ...studentState
            }));
        }

        setIsModalActive( false );
        clearEditStudent();

    }

    return (
        // <span>test</span>
        <Modal onClose={clearEditStudent}>
            <Box className="py-5">
                <Heading renderAs="h2">{_id ? "Edit" : "New"} User</Heading>
                <hr />
                <Form fields={fields} onSubmit={handleSubmit} buttonText={(_id ? "Save" : "Create") + " Student"}/>
            </Box>
        </Modal>
    )

}

export default EditStudentModal;