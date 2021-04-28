import React, { useState, useReducer } from "react";

import {
	Modal,
	Box,
	Columns,
	Heading,
	Tag,
	Button,
	Tabs,
	Level,
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
import { useOutsideClickDispatch } from "../../../../utils/detection";

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


	const [isActive, dispatchComment] = useReducer(
		(state, action) => action === "open"
	);

	const commentRef = useOutsideClickDispatch({
		isActive,
		dispatch:dispatchComment,
		action: "close"
	});

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
		<Modal
			className="is-student-modal"
			onClose={clearEditStudent}
			show={show}
			closeOnBlur={true}>
			<Fade style={{ width: "100%" }} show={show} duration=".5s">
				<Modal.Content {...contentProps} className="hide-overflow">
					<Columns gapless className="h-100" breakpoint="desktop">
						{_id ? (
							<Box className="is-tabs">
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
										className={
											activityTab ? "is-active" : ""
										}>
										Activity
									</Tab>
								</Tabs>
							</Box>
						) : null}
						{editStudentTab || width >= 1025 ? (
							<Column
								desktop={{
									size: _id ? "half" : 12
								}}
								className="has-filled-content is-column-has-ratio">
								<Box
									className={`${
										_id
											? "is-edit-student-id"
											: "is-edit-student"
									}`}>
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
									<Column
										desktop={{
											size: "half"
										}}
										className="has-filled-content is-activity-feed-column">
										<ActivtyFeed
											className="p-6 is-shadowless has-background-white-bis has-text-grey m-0 is-activity-feed"
											student={editStudent}
										/>
										<Box className="has-background-white-bis has-text-grey is-comment-box">
											{isActive ? (
												<div ref={commentRef}>
													<CommentForm
														feedId={
															editStudent.feed
														}
													/>
												</div>
											) : (
												<Button
													onClick={() =>
														dispatchComment("open")
													}
													className="is-flex-grow-1 has-text-grey is-fullwidth is-comment-button">
													Add a comment...
												</Button>
											)}
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