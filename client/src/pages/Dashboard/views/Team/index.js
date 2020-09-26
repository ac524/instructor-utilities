import React from "react";

import {
    Section,
    Columns
} from "react-bulma-components";

import { useTopbarConfig } from "pages/Dashboard/components/Topbar";
import StaffListControls from "./components/StaffListControls";
import { useStaffByRole } from "pages/Dashboard/store";
import { Redirect, Route, Switch, useParams } from "react-router-dom";
import StaffGroupPanel from "./components/StaffGroupPanel";
import StudentModal from "pages/Dashboard/components/StudentModal";
import Member from "./components/Member";

const { Column } = Columns;

const Team = () => {

    useTopbarConfig({ name: "Team" });

    const staff = useStaffByRole();
    const { roomId } = useParams();

    return (
        <Section>
            <StaffListControls />
            <Columns>
                <Column tablet={{size:"half"}} desktop={{size:"one-quarter"}}>
                    {staff.instructor && <StaffGroupPanel title="Instructors" staff={staff.instructor} />}
                    {staff.ta && <StaffGroupPanel title="TAs" staff={staff.ta} />}
                </Column>
                <Column>
                    <Switch>
                        <Route exact path={`/${roomId}/team/:memberId`} component={Member} />
                        <Route render={({ location })=><Redirect to={{ pathname: `/${roomId}/team/${staff.instructor[0]._id}`, state: { from: location } }} />} />
                    </Switch>
                </Column>
            </Columns>
            <StudentModal />
        </Section>
    );
    
}

export default Team;