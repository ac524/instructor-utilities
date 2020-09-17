import React, { useState, useEffect } from "react";

import {
    Box,
    Heading,
    Button
} from "react-bulma-components";

import Modal, { useModalContext } from "../../../../../components/Modal";
import Form from "../../../../../components/Form";

import { useDashboardContext, getDashboardAction as gda, useEditStudent, useStaff } from "../../../store";
import { EDIT_STUDENT } from "../../../store/actions";
import api from "../../../../../utils/api";

const EditStudentModal = () => {

    const [ { classroom, editStudent: editStudentId }, dispatch ] = useDashboardContext();
    const [ ,setIsModalActive ] = useModalContext();

    const staff = useStaff();
    const editStudent = useEditStudent();

    const { _id } = editStudent;

    const [ studentState, setStudent ] = useState( editStudent );

    useEffect(() => {

        setStudent( editStudent );

        if( editStudentId === false ) {

            setIsModalActive(false);

        } else {
        
            setIsModalActive(true);

        }

    }, [editStudent, editStudentId, setStudent, setIsModalActive]);

    const handleInputUpdate = ( { target: { name, value } } ) => setStudent( { ...studentState, [name]: value } );

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

        if( _id ) {
            await api.updateStudent( _id, studentState );
        } else {
            await api.createStudent( { ...studentState, roomId: classroom._id } );
        }

        clearEditStudent();

    }


    const handleRemoveSubmit = async (e) => {

        e.preventDefault();
        
        await api.removeStudent( _id );

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
                <Form fields={fields} onSubmit={handleSubmit} button={button} moreButtons={moreButtons} />
            </Box>
        </Modal>
    )

}

export default EditStudentModal;