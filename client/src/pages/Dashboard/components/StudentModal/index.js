import React, { useEffect } from "react";

import {
    Box,
    Columns,
    Heading
} from "react-bulma-components";

import Modal, { useModalContext } from "components/Modal";


import { getDashboardAction as gda, useEditStudent, useClassroom, useDashboardDispatch, useDashboardContext } from "pages/Dashboard/store";
import { EDIT_STUDENT } from "pages/Dashboard/store/actions";
// import api from "utils/api";
import SettingsForm from "./components/SettingsForm";
import ActivtyFeed from "./components/ActivityFeed";

const { Column } = Columns;

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
        <Modal onClose={clearEditStudent} contentProps={{style:{width:"100%",height:"800px"},className:"has-filled-content"}}>
            <Columns gapless>
                <Column className="has-filled-content">
                    <Box className="py-5 is-shadowless">
                        <Heading renderAs="h2">{_id ? "Edit" : "New"} Student</Heading>
                        <hr />
                        <SettingsForm roomId={classroom._id} student={editStudent} afterSubmit={clearEditStudent} />
                    </Box>
                </Column>
                <Column className="has-filled-content">
                    <Box className="p-6 is-shadowless has-background-white-bis has-text-grey">
                        <ActivtyFeed student={editStudent} />
                    </Box>
                </Column>
            </Columns>
        </Modal>
    )

}

export default StudentModal;