import React, { useState, useEffect } from "react";

import {
    Modal,
    Box,
    Columns,
    Heading,
    Tag,
    Button,
    Tabs
} from "react-bulma-components";

import { getDashboardAction as gda, useEditStudent, useClassroom, useDashboardDispatch, useDashboardContext } from "pages/Dashboard/store";
import { EDIT_STUDENT } from "pages/Dashboard/store/actionsNames";
import SettingsForm from "./components/SettingsForm";
import ActivtyFeed from "./components/ActivityFeed";
import StudentOptions from "./components/StudentOptions";
import Icon from "components/Icon";
import Fade from "animations/Fade";
import CommentForm from "./components/ActivityFeed/components/CommentForm";
import {useWindowDimensions} from "./utils"
import "./index.sass"

const { Column } = Columns;
const { Tab } = Tabs;
const StudentModal = () => {
    const [{ editStudent: editStudentId }] = useDashboardContext();
    const dispatch = useDashboardDispatch();
    const classroom = useClassroom();
    const [ isBulkCreate, setIsBulkCreate ] = useState(false);
    const [activityTab, setActivityTab] = useState(false);
    const [editStudentTab, setEditStudentTab] = useState(true);
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

    const setTabs = (action) => {
		if (action === "edit") {
			setActivityTab(false);
			setEditStudentTab(true);
			return;
		}
		setActivityTab(true);
		setEditStudentTab(false);
	};

    const { width } = useWindowDimensions();

    return (
		// <span>test</span>
		<Modal onClose={clearEditStudent} show={show} closeOnBlur={true}>
			<Fade style={{ width: "100%" }} show={show} duration=".5s">
				<Modal.Content {...contentProps}>
					<Columns gapless className="h-100" breakpoint="desktop">
						<Box
							className="is-shadowless pb-0 mb-0 is-hidden-desktop"
							style={{
								flexGrow: 0,
								borderTop: "2px solid #dfdfdf",
								borderRadius: 0
							}}>
							<Tabs centered="centered">
								<Tab
									onClick={() => setTabs("edit")}
									className={
										editStudentTab ? "is-active" : ""
									}>
									Edit Student
								</Tab>
								<Tab
									onClick={() => setTabs("activity")}
									className={activityTab ? "is-active" : ""}>
									Activity
								</Tab>
							</Tabs>
						</Box>
						{editStudentTab ? (
							<Column className="has-filled-content">
								<Box className="py-5 is-shadowless">
									<div
										className="is-flex"
										style={{ alignItems: "center" }}>
										<Heading renderAs="h2" className="mb-0">
											{_id ? "Edit" : "New"} Student
										</Heading>
										{editStudent.elevation ? (
											<Tag
												color="danger"
												className="ml-2">
												<Icon icon="level-up-alt" />
											</Tag>
										) : null}
										{_id ? (
											<span className="ml-auto">
												<StudentOptions
													student={editStudent}
													labelSize="small"
													className="is-right"
												/>
											</span>
										) : (
											<span className="ml-auto">
												<Button
													size="small"
													onClick={toggleBulkCreate}
													color={
														isBulkCreate
															? "primary"
															: null
													}>
													Bulk Add
												</Button>
											</span>
										)}
									</div>
									<hr />
									<SettingsForm
										roomId={classroom._id}
										student={editStudent}
										afterSubmit={clearEditStudent}
										isBulkCreate={isBulkCreate}
									/>
								</Box>
							</Column>
						) : null}
						{activityTab || width >= 1025
							? _id && (
									<Column className="has-filled-content h-100">
										<ActivtyFeed
											className="p-6 is-shadowless has-background-white-bis has-text-grey m-0"
											student={editStudent}
											style={{
												borderBottomRightRadius: 0
											}}
										/>
										<Box
											className="px-6 py-3 is-shadowless has-background-white-bis has-text-grey m-0"
											style={{
												flexGrow: 0,
												borderTop: "2px solid #dfdfdf",
												borderTopRightRadius: 0
											}}>
											<CommentForm
												feedId={editStudent.feed}
											/>
										</Box>
									</Column>
							  )
							: null}
					</Columns>
				</Modal.Content>
			</Fade>
		</Modal>
	);

}

export default StudentModal;