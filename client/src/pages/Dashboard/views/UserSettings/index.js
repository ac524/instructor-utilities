import React from "react";

import {
    Section,
    Columns,
} from "react-bulma-components";

import { useTopbarConfig } from "pages/Dashboard/components/Topbar";
import UserSettingsForm from "./components/UserSettingsForm";
import UserClassrooms from "./components/UserClassrooms";
import NoClassroomNotification from "./components/NoClassroomNotification";

const { Column } = Columns;

const UserSettings = () => {

    useTopbarConfig({ name: "Account Settings" });

    return (
        <Section>
            <Columns>
                <Column size="half">
                    <UserSettingsForm />
                </Column>
                <Column>
                    <NoClassroomNotification />
                    <UserClassrooms />
                </Column>
            </Columns>
        </Section>
    );

}

export default UserSettings;