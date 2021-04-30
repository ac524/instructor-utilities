import React, { useState, useReducer, useRef } from "react";

import {
	Modal,
	Box,
	Columns,
	Heading,
	Tag,
	Button,
} from "react-bulma-components";

import { getDashboardAction as gda, useEditStudent, useClassroom, useDashboardDispatch, useDashboardContext } from "pages/Dashboard/store";
import { EDIT_STUDENT } from "pages/Dashboard/store/actionsNames";
import SettingsForm from "./components/SettingsForm";
import ActivtyFeed from "./components/ActivityFeed";
import StudentOptions from "./components/StudentOptions";
import Icon from "components/Icon";
import Fade from "animations/Fade";
import CommentForm from "./components/ActivityFeed/components/CommentForm";
import {useWindowDimensions} from "../../../../utils/windowWidth"
import "./index.sass" 
import { useOutsideClickDispatch } from "../../../../utils/detection";
import StudentModalTabs from "./components/StudentModalTabs";

const { Column } = Columns;

const StudentModal = () => {
    const [{ editStudent: editStudentId }] = useDashboardContext();
    const dispatch = useDashboardDispatch();
    const classroom = useClassroom();
    const [ isBulkCreate, setIsBulkCreate ] = useState(false);
    

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
	//All the variables used to create tabs and change them when need it
	const [selectedTab, setSelectedTab] = useState("Edit Student");

    const setTabs = (action) => {
		setSelectedTab(action);
	};

	const list = ["Edit Student", "Activity"];

    const { width } = useWindowDimensions();

	const windowBreakPoint = 1025
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
								<StudentModalTabs
									setTabs={setTabs}
									selectedTab={selectedTab}
									listOfTabs={list}
								/>
							</Box>
						) : null}
						{selectedTab === "Edit Student" ||
						width >= windowBreakPoint ||
						!_id ? (
							<Column
								desktop={{
									size: _id ? "half" : 12
								}}
								className="has-filled-content is-edit-student-column">
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
						{selectedTab === "Activity" || width >= windowBreakPoint
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