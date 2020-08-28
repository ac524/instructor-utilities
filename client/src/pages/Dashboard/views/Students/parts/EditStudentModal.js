import React, { useState, useEffect } from "react";

import Box from "react-bulma-components/lib/components/box";
import Heading from "react-bulma-components/lib/components/heading";
import Button from "react-bulma-components/lib/components/button";

import Modal, { useModalContext } from "components/Modal";
import Form from "components/Form";

import { useDashboardContext, getDashboardAction as gda, useEditStudent, useStaff } from "pages/Dashboard/store";
import { UPDATE_STUDENT, ADD_STUDENT, EDIT_STUDENT, REMOVE_STUDENT } from "pages/Dashboard/store/actions";

function EditStudentModal() {

    const [ , dispatch ] = useDashboardContext();
    const [ ,setIsModalActive ] = useModalContext();

    const staff = useStaff();
    const editStudent = useEditStudent();

    const { _id } = editStudent;

    const [ studentState, setStudent ] = useState( editStudent );

    useEffect(() => {

        setStudent( editStudent );

        if( editStudent._id ) setIsModalActive(true);

    }, [editStudent, setStudent, setIsModalActive]);

    const handleInputUpdate = ( { target: { name, value } } ) => {

        if( name === 'assignedTo' ) value = parseInt(value);

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
        },
        {
            label: "Staff Assignment",
            name: "assignedTo",
            type: "select",
            options: staff.map(({ _id, user: { name } }) => ({ value: _id, label: name })),
            value: studentState.assignedTo,
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

        clearEditStudent(() => setIsModalActive( false ));

    }


    const handleRemoveSubmit = (e) => {

        e.preventDefault();
        
        clearEditStudent(() => setIsModalActive( false ));
        dispatch(gda(REMOVE_STUDENT, _id));

    }

    const moreButtons = [
        _id
            ? <Button key="remove" color="danger" className="ml-auto" onClick={handleRemoveSubmit}>Remove</Button>
            : <Button key="cancel" color="danger" className="ml-auto" onClick={() => clearEditStudent(() => setIsModalActive( false ))}>Cancel</Button>
    ];

    return (
        // <span>test</span>
        <Modal onClose={clearEditStudent}>
            <Box className="py-5">
                <Heading renderAs="h2">{_id ? "Edit" : "New"} User</Heading>
                <hr />
                <Form fields={fields} onSubmit={handleSubmit} buttonText={(_id ? "Save" : "Create") + " Student"} moreButtons={moreButtons} />
            </Box>
        </Modal>
    )

}

export default EditStudentModal;