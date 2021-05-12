import { useMemo } from "react";

import { getDashboardAction as gda, useEditStudent, useClassroom, useDashboardContext } from "pages/Dashboard/store";
import { EDIT_STUDENT } from "pages/Dashboard/store/actionsNames";

import {
	usePanels
} from "./panels";

import { useWindowDimensions } from "utils/windowWidth"

export const useStudentModalConfig = () => {

    const [{ editStudent: editStudentId }, dispatch] = useDashboardContext();

    const isViewing = editStudentId !== false;

    const { _id: roomId } = useClassroom();

    const student = useEditStudent();

    const clearEditStudent = () => dispatch(gda(EDIT_STUDENT, false));

    const { width } = useWindowDimensions();
	const windowBreakPoint = 1025;

	const panelConfig = usePanels( roomId, student );

	const activePanels = useMemo(() => new Map( [...panelConfig.panels].filter(([key]) => width >= windowBreakPoint || key === panelConfig.activePanel) ));

    return {
        student,
        isViewing,
        panelConfig,
        activePanels,
        clearEditStudent
    }

}