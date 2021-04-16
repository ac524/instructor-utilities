import {
    Section,
    Columns,
} from "react-bulma-components";

import { useTopbarConfig } from "pages/Dashboard/components/Topbar";
import UserSettingsForm from "./components/UserSettingsForm";
import UserClassrooms from "./components/UserClassrooms";
import NoClassroomNotification from "./components/NoClassroomNotification";
import { useAuthorizedUser } from "utils/auth";

const { Column } = Columns;

const UserSettings = () => {

    useTopbarConfig({ name: "Account Settings" });
    const user = useAuthorizedUser();

    return (
        <Section>
            {!user.classrooms.length && <NoClassroomNotification />}
            <Columns>
                <Column size="half">
                    <UserSettingsForm />
                </Column>
                <Column>
                    <UserClassrooms />
                </Column>
            </Columns>
        </Section>
    );

}

export default UserSettings;