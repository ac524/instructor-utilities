import { useMemo, useState } from "react";
import { ActivityPanel } from "./ActivityPanel";
import { StudentPanel } from "./StudentPanel";

export const usePanels = (roomId, student) => {

    const panels = useMemo(() => new Map([
		["student", {
			label: "Edit Student",
			Panel: <StudentPanel roomId={roomId} student={student} />
		}],
		["activity", {
			label: "Edit Student",
			Panel: <ActivityPanel student={student} />
		}]
	]), [roomId, student]);

    const [panel, setPanel] = useState(() => panels.keys().next().value);

    return [ panel, setPanel, panels ];
    
}