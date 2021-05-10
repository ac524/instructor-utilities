import { useMemo } from "react";

import {
	Box,
	Columns
} from "react-bulma-components";

import { getDashboardAction as gda, useEditStudent, useClassroom, useDashboardContext } from "pages/Dashboard/store";
import { EDIT_STUDENT } from "pages/Dashboard/store/actionsNames";

import {
	ModalBox,
} from "./components";

import {
	PanelTabs,
	usePanels
} from "./panels";

import {useWindowDimensions} from "utils/windowWidth"

import "./index.sass" 

const { Column } = Columns;

const StudentModal = () => {

	// We pull in the student to edit from the dashboard state
    const [{ editStudent: editStudentId }, dispatch] = useDashboardContext();

    const isViewing = editStudentId !== false;

    const { _id: roomId } = useClassroom();

    const editStudent = useEditStudent();

    const clearEditStudent = () => dispatch(gda(EDIT_STUDENT, false));

    const { width } = useWindowDimensions();
	const windowBreakPoint = 1025;

	const panelConfig = usePanels( roomId, editStudent );

	const activePanels = useMemo(() => new Map( [...panelConfig.panels].filter(([key]) => width >= windowBreakPoint || key === panelConfig.activePanel) ));

    return (
		<ModalBox fullScreen={editStudent._id} onClose={clearEditStudent} show={isViewing}>

			{panelConfig.panels.size > 1 && <Box className="is-tabs"><PanelTabs {...panelConfig} /></Box>}

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