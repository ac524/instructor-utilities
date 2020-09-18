import React from "react";

import {
    Section,
    Columns
} from "react-bulma-components";

import { useTopbarConfig } from "pages/Dashboard/components/Topbar";
import UserSettingsForm from "./components/UserSettingsForm";

const { Column } = Columns;

const UserSettings = () => {

    useTopbarConfig({ name: "Account Settings" });

    return (
        <Section>
            <Columns>
                <Column size="half">
                    <UserSettingsForm />
                </Column>
            </Columns>
        </Section>
    );

}

export default UserSettings;