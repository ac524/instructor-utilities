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
	Form
} from "react-bulma-components";
const { Textarea } = Form;

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
						{editStudentTab || width >= 1025 ? (
							<Column
								className="has-filled-content is-radiusless h-90"
								desktop={{
									size: "half"
								}}>
								<Box className="py-5 is-shadowless is-radiusless">
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
										className="has-filled-content h-90 is-radiusless"
										desktop={{
											size: "half"
										}}>
										<ActivtyFeed
											className="p-6 is-shadowless has-background-white-bis has-text-grey m-0 is-radiusless"
											student={editStudent}
											style={{
												borderBottomRightRadius: 0
											}}
										/>
										<Box
											className="p-0 has-background-white-bis has-text-grey m-0"
											style={{
												flexGrow: 0,
												borderTopRightRadius: 0
											}}>
											{isActive ? (
												<CommentForm
													ifFocus="is-focused"
													commentRef={commentRef}
													feedId={editStudent.feed}
												/>
											) : (
												<Level className="has-background-white-bis is-flex-grow-1 has-shadow">
													<Level.Side
														align="left"
														className="is-flex-grow-1">
														<Level.Item
															className="is-flex-grow-1"
															onClick={() =>
																dispatchComment(
																	"open"
																)
															}
															color="light">
															<Textarea
																placeholder="Add a comment..."
																rows={
																	1
																}></Textarea>
														</Level.Item>
													</Level.Side>
												</Level>
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