import React, { useState, useEffect } from "react";

import Box from "react-bulma-components/lib/components/box";
import Heading from "react-bulma-components/lib/components/heading";

import Modal, { useModalContext } from "components/Modal";
import Form from "components/Form";
import { useDashboardContext, getDashboardAction as gda } from "pages/Dashboard/store";
import { useGetStudent } from "pages/Dashboard/store/getters";
import { UPDATE_STUDENT, ADD_STUDENT } from "pages/Dashboard/store/actions";

function EditStudentModal() {

    const getStudent = useGetStudent();
    const [ , dispatch ] = useDashboardContext();
    const [ ,setIsModalActive ] = useModalContext();

    const { _id, name, priorityLevel, ...student } = getStudent(1) || {};

    const [nameState, setName] = useState( name );
    const [priorityLevelState, setPriorityLevel] = useState( priorityLevel );

    useEffect(() => {

        setName(name);
        setPriorityLevel(priorityLevel);

    }, [name, priorityLevel, setName, setPriorityLevel]);

    // Student form fields configuration.
    const fields = [
        {
            label: "Student Name",
            placeholder: "Student Name",
            name: "name",
            type: "text",
            value: nameState,
            onChange: (e) => setName(e.target.value)
        },
        {
            label: "Priority",
            placeholder: "Priority",
            name: "priorityLevel",
            type: "number",
            value: priorityLevelState,
            onChange: (e) => setPriorityLevel(e.target.value)
        }
    ];

    const handleSubmit = () => {

        if( _id ) {

            if( _id ) {
                dispatch(gda( UPDATE_STUDENT, {
                    _id,
                    name: nameState,
                    priorityLevel: priorityLevelState,
                    ...student
                } ));
            } else {
                dispatch(gda( ADD_STUDENT, {
                    _id: Math.floor(Math.random()*10000),
                    name: nameState,
                    priorityLevel: priorityLevelState
                }));
            }

            setIsModalActive( false );

        }

    }

    return (
        // <span>test</span>
        <Modal>
            <Box className="py-5">
                <Heading renderAs="h2">{_id ? "Edit" : "New"} User</Heading>
                <hr />
                <Form fields={fields} onSubmit={handleSubmit} buttonText={(_id ? "Save" : "Create") + " Student"}/>
            </Box>
        </Modal>
    )

}

export default EditStudentModal;