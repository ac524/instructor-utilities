import React, { useState } from "react";

import {
    Modal,
    Box,
    Columns,
    Heading,
    Tag,
    Button
} from "react-bulma-components";

import { getDashboardAction as gda, useEditStudent, useClassroom, useDashboardDispatch, useDashboardContext } from "pages/Dashboard/store";
import { EDIT_STUDENT } from "pages/Dashboard/store/actionsNames";
import SettingsForm from "./components/SettingsForm";
import ActivtyFeed from "./components/ActivityFeed";
import StudentOptions from "./components/StudentOptions";
import Icon from "components/Icon";
import Fade from "animations/Fade";
import CommentForm from "./components/ActivityFeed/components/CommentForm";

const { Column } = Columns;

const StudentModal = () => {
    
    const [{ editStudent: editStudentId }] = useDashboardContext();
    const dispatch = useDashboardDispatch();
    const classroom = useClassroom();
    const [ isBulkCreate, setIsBulkCreate ] = useState(false);
    
    const editStudent = useEditStudent();

    const { _id } = editStudent;
    const show = editStudentId !== false;

    const clearEditStudent = () => dispatch(gda(EDIT_STUDENT, false));

    const toggleBulkCreate = () => setIsBulkCreate( !isBulkCreate );

    const contentProps = {};

    if(_id) {
        contentProps.style = {width:"100%",height:"800px"};
        contentProps.className = "has-filled-content";
    }

    return (
        // <span>test</span>
            <Modal onClose={clearEditStudent} show={show} closeOnBlur={true}>
                <Fade style={{width:"100%"}} show={show} duration=".5s">
                    <Modal.Content {...contentProps}>
                        <Columns gapless className="h-100">
                            <Column className="has-filled-content">
                                <Box className="py-5 is-shadowless">
                                    <div className="is-flex" style={{alignItems:"center"}}>
                                        <Heading renderAs="h2" className="mb-0">{_id ? "Edit" : "New"} Student</Heading>
                                        { editStudent.elevation ? <Tag color="danger" className="ml-2"><Icon icon="level-up-alt" /></Tag> : null }
                                        { _id
                                            ? (
                                                <span className="ml-auto">
                                                    <StudentOptions student={editStudent} labelSize="small" className="is-right" />
                                                </span>
                                            )
                                            : (
                                                <span className="ml-auto">
                                                    <Button size="small" onClick={toggleBulkCreate} color={isBulkCreate ? "primary" : null}>Bulk Add</Button>
                                                </span>
                                            )
                                        }
                                    </div>
                                    <hr />
                                    <SettingsForm roomId={classroom._id} student={editStudent} afterSubmit={clearEditStudent} isBulkCreate={isBulkCreate} />
                                </Box>
                            </Column>
                            {
                                _id && (
                                    <Column className="has-filled-content h-100">
                                        <ActivtyFeed className="p-6 is-shadowless has-background-white-bis has-text-grey m-0" student={editStudent} style={{borderBottomRightRadius:0}} />
                                        <Box className="px-6 py-3 is-shadowless has-background-white-bis has-text-grey m-0" style={{flexGrow:0,borderTop:"2px solid #dfdfdf",borderTopRightRadius:0}}>
                                            <CommentForm feedId={editStudent.feed} />
                                        </Box>
                                    </Column>
                                )
                            }
                        </Columns>
                    </Modal.Content>
                </Fade>
            </Modal>
    )

}

export default StudentModal;