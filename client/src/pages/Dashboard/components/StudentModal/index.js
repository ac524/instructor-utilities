import React, { useEffect } from "react";

import {
    Box,
    Heading
} from "react-bulma-components";

import Modal, { useModalContext } from "components/Modal";


import { getDashboardAction as gda, useEditStudent, useClassroom, useDashboardDispatch, useDashboardContext } from "pages/Dashboard/store";
import { EDIT_STUDENT } from "pages/Dashboard/store/actions";
// import api from "utils/api";
import StudentSettingsForm from "./components/StudentSettingsForm";


const StudentModal = () => {
    
    const [{ editStudent: editStudentId }] = useDashboardContext();
    const dispatch = useDashboardDispatch();
    const classroom = useClassroom();
    const [ ,setIsModalActive ] = useModalContext();
    
    const editStudent = useEditStudent();

    const { _id } = editStudent;

    useEffect(() => {

        if( editStudentId === false ) {

            setIsModalActive(false);

        } else {
        
            setIsModalActive(true);

        }

    }, [editStudentId, setIsModalActive]);


    const clearEditStudent = () => {

        dispatch(gda(EDIT_STUDENT, false));

    }

    // const handleRemoveSubmit = async (e) => {

    //     e.preventDefault();
        
    //     dispatch(gda( REMOVE_STUDENT, _id ));

    //     await api.removeStudent( classroom._id, _id );

    //     clearEditStudent();

    // }

    return (
        // <span>test</span>
        <Modal onClose={clearEditStudent}>
            <Box className="py-5">
                <Heading renderAs="h2">{_id ? "Edit" : "New"} Student</Heading>
                <hr />
                <StudentSettingsForm roomId={classroom._id} student={editStudent} afterSubmit={clearEditStudent} />
            </Box>
        </Modal>
    )

}

export default StudentModal;