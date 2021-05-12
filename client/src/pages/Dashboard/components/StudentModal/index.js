import { Box, Columns } from "react-bulma-components";

import { ModalBox } from "./components";

import { PanelTabs } from "./panels";

import { useStudentModalConfig } from "./utils";

import "./index.sass" ;

const { Column } = Columns;

const StudentModal = () => {

	// We pull in the student to edit from the dashboard state
	const {
		student,
		isViewing,
		panelConfig,
		activePanels,
		clearEditStudent
	} = useStudentModalConfig();

    return (
		<ModalBox fullScreen={student._id} onClose={clearEditStudent} show={isViewing}>
			{/* Dispay panel tabs */}
			{panelConfig.panels.size > 1 && <Box className="is-tabs"><PanelTabs {...panelConfig} /></Box>}

			{/* Display each active panel */}
			{[...activePanels].map(([key,{Panel}]) => (
				<Column
					key={key}
					desktop={{ size: activePanels.size > 1 ? "half" : 12 }}
					className={`has-filled-content is-${key}-column`}>
						<Panel />
				</Column>
			))}
		</ModalBox>
	)

}

export default StudentModal;