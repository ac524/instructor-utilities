import React, { useState, useEffect } from "react";

import {
    Box,
    Heading,
    Button
} from "react-bulma-components";

import Modal, { useModalContext } from "components/Modal";
import Form, { createValidator } from "components/Form";

import { useDashboardContext, getDashboardAction as gda, useEditStudent, useStaff } from "pages/Dashboard/store";
import { EDIT_STUDENT } from "pages/Dashboard/store/actions";
import api from "utils/api";
import { usePriorityLevel } from "pages/Dashboard/utils/student";

const validateStudentData = createValidator({
    filters: {
        assignedTo: value => value || null
    },
    validators: {
        name: ({ name }) => name ? null : "Please provide a name"
    }
});

const EditStudentModal = () => {

    const [ { classroom, editStudent: editStudentId }, dispatch ] = useDashboardContext();
    const [ ,setIsModalActive ] = useModalContext();

    const staff = useStaff();
    const editStudent = useEditStudent();

    const { _id } = editStudent;

    const [ studentState, setStudent ] = useState( editStudent );
    const [ errors, setErrors ] = useState( {} );

    useEffect(() => {

        setStudent( editStudent );

        if( editStudentId === false ) {

            setIsModalActive(false);

        } else {
        
            setIsModalActive(true);

        }

    }, [editStudent, editStudentId, setStudent, setIsModalActive]);

    const handleInputUpdate = ( { target: { name, value } } ) => {
        // console.log();
        setStudent( { ...studentState, [name]: value } )
    };

    const priorityLevel = usePriorityLevel(studentState.priorityLevel);

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
            name: "priorityLevel",
            type: "range",
            value: studentState.priorityLevel,
            onChange: handleInputUpdate,
            inputProps: {
                min: 1,
                max: 10,
                step: 1,
                color: priorityLevel ? priorityLevel.color : null,
                light: true,
                size: "large"
            }
        },
        {
            label: "Staff Assignment",
            name: "assignedTo",
            type: "select",
            options: [ { value: "", label: "Unassigned" }, ...staff.map(({ _id, user: { name } }) => ({ value: _id, label: name })) ],
            value: studentState.assignedTo,
            onChange: handleInputUpdate
        }
    ];

    const clearEditStudent = () => {

        dispatch(gda(EDIT_STUDENT, false));

    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        const [ data, errors, hasErrors ] = validateStudentData(studentState);

        if( hasErrors ) {
            setErrors( errors );
            return
        }

        try {

            if( _id ) {
                await api.updateStudent( classroom._id, _id, data );
            } else {
                await api.createStudent( { ...data, roomId: classroom._id } );
            }

        } catch(err) {

            if( err.response ) setErrors( err.response.data );

        }

        clearEditStudent();

    }

    const handleRemoveSubmit = async (e) => {

        e.preventDefault();
        
        await api.removeStudent( classroom._id, _id );

        clearEditStudent();

    }

    const button = <Button color="primary" className="is-light has-shadow-light">{(_id ? "Save" : "Create") + " Student"}</Button>;

    const moreButtons = _id
        ? (
            <div className="ml-auto">
                <Button color="danger" outlined className="has-shadow-light" onClick={handleRemoveSubmit}>Remove</Button>
                <Button color="danger" className="is-light ml-2 has-shadow-light" onClick={() => clearEditStudent(() => setIsModalActive( false ))}>Cancel</Button>
            </div>
        )
        : <Button color="danger" className="ml-auto is-light has-shadow-light" onClick={() => clearEditStudent(() => setIsModalActive( false ))}>Cancel</Button>

    return (
        // <span>test</span>
        <Modal onClose={clearEditStudent}>
            <Box className="py-5">
                <Heading renderAs="h2">{_id ? "Edit" : "New"} Student</Heading>
                <hr />
                <Form fields={fields} onSubmit={handleSubmit} button={button} moreButtons={moreButtons} errors={errors} />
            </Box>
        </Modal>
    )

}

export default EditStudentModal;