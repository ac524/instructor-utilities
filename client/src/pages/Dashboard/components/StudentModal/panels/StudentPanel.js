import { useState } from "react";

import {
	Box,
	Heading,
	Tag,
	Button,
} from "react-bulma-components";

import {
	SettingsForm,
	StudentOptions,
} from "../components";

const StudenPanelHeading = ({ isNew }) => {
    return (
        <Heading renderAs="h2" className="mb-0">
            {isNew ? "New" : "Edit"} Student
        </Heading>
    );
}

export const StudentPanel = ( { roomId, student } ) => {

    const isNew = !student._id;

    const [ isBulkCreate, setIsBulkCreate ] = useState(false);

    const toggleBulkCreate = () => setIsBulkCreate( !isBulkCreate );

    return (
		<Box className={`${isNew ? "is-edit-student" : "is-edit-student-id"}`}>
			<div className="is-flex" style={{ alignItems: "center" }}>
				<StudenPanelHeading isNew={isNew} />
				{student.elevation ? (
					<Tag color="danger" className="ml-2">
						<Icon icon="level-up-alt" />
					</Tag>
				) : null}
				{isNew ? (
					<span className="ml-auto">
						<Button
							size="small"
							onClick={toggleBulkCreate}
							color={isBulkCreate ? "primary" : null}>
							Bulk Add
						</Button>
					</span>
				) : (
					<span className="ml-auto">
						<StudentOptions
							student={student}
							labelSize="small"
							className="is-right"
						/>
					</span>
				)}
			</div>
			<hr />
			<SettingsForm
				roomId={roomId}
				student={student}
				isBulkCreate={isBulkCreate}
			/>
		</Box>
	);
}