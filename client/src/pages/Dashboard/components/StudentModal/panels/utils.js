import { useMemo, useState } from "react";
import { ActivityPanel } from "./ActivityPanel";
import { StudentPanel } from "./StudentPanel";

export const usePanels = (roomId, student) => {

    const panels = useMemo(() => new Map([
		["student", {
			label: "Edit Student",
			Panel: () => <StudentPanel roomId={roomId} student={student} />
		}],
        // Only add the actity panel if the student exists
        ...(student._id ? [["activity", {
			label: "Activity",
			Panel: () => <ActivityPanel student={student} />
		}]] : [])
	]), [roomId, student]);

    const [activePanel, setPanel] = useState(() => panels.keys().next().value);

    return { activePanel, setPanel, panels };
    
}