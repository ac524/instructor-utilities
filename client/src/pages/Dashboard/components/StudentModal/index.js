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
		<Modal onClose={clearEditStudent} show={show} closeOnBlur={true}>
			<Fade style={{ width: "100%" }} show={show} duration=".5s">
				<Modal.Content {...contentProps} className="hide-overflow">
					<Columns gapless className="h-100" breakpoint="desktop">
						{_id ? (
							<Box
								className="is-shadowless pb-0 mb-0 is-hidden-desktop"
								style={{
									flexGrow: 0,
									borderRadius: 0,
									borderTopLeftRadius: 6,
									borderTopRightRadius: 6
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
								className={`has-filled-content ${
									width >= 1025 ? "h-95" : "h-90"
								}`}>
								<Box
									className="py-5 is-shadowless"
									style={{
										borderRadius: 0,
										borderBottomLeftRadius: 6,
										borderBottomRightRadius:
											width >= 1025
												? _id
													? 0
													: 6
												: _id
												? 6
												: 6,
										borderTopLeftRadius:
											width >= 1025 ? 6 : _id ? 0 : 6,
										borderTopRightRadius:
											width >= 1025
												? _id
													? 0
													: 6
												: _id
												? 0
												: 6
									}}>
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
										className={`has-filled-content ${
											width >= 1025 ? "h-95" : "h-90"
										}`}>
										<ActivtyFeed
											className="p-6 is-shadowless has-background-white-bis has-text-grey m-0"
											student={editStudent}
											style={{
												borderRadius: 0,
												borderTopRightRadius:
													width >= 1025 ? 6 : 0,
												height: 100
											}}
										/>
										<Box
											className="p-0 has-background-white-bis has-text-grey m-0"
											style={{
												flexGrow: 0,
												borderRadius: 0,
												borderBottomLeftRadius:
													width >= 1025 ? 0 : 6,
												borderBottomRightRadius: 6
											}}>
											{isActive ? (
												<CommentForm
													ref={commentRef}
													feedId={editStudent.feed}
												/>
											) : (
												<Button
													onClick={()=>dispatchComment(
														"open"
													)}
													className="is-flex-grow-1 has-text-grey is-fullwidth"
													style={{
														borderRadius: 0,
														borderLeftStyle:
															"none",
														borderRightStyle:
															"none",
														borderBottomLeftRadius:
															width >= 1025
																? 0
																: 6,
														borderBottomRightRadius: 6
													}}>
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