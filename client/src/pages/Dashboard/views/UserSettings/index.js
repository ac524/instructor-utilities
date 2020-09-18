import React from "react";

import {
    Section,
    Columns,
    Box,
    Heading,
    Button
} from "react-bulma-components";

import { useTopbarConfig } from "pages/Dashboard/components/Topbar";
import UserSettingsForm from "./components/UserSettingsForm";
import { useUserRoomnames } from "utils/user";
import Icon from "components/Icon";

const { Column } = Columns;

const UserSettings = () => {

    useTopbarConfig({ name: "Account Settings" });

    const roomnames = useUserRoomnames();

    return (
        <Section>
            <Columns>
                <Column size="half">
                    <UserSettingsForm />
                </Column>
                <Column>
                    <Box>
                        <Heading renderAs="h2" size={4}>Classrooms</Heading>
                        <Heading renderAs="h3" size={6} className="is-primary">Instructor Rooms</Heading>
                        <div className="has-flex-rows is-hover">
                        {
                            roomnames.map( room => (
                                <p className="is-flex py-1" style={{alignItems:"center"}}>
                                    <span style={{flexGrow:1}} className="px-2">{room.name}</span>
                                    <Button size="small">
                                        <Icon icon="sign-out-alt" />
                                        <span>Leave</span>
                                    </Button>
                                </p>
                            ) )
                        }
                        </div>
                    </Box>
                </Column>
            </Columns>
        </Section>
    );

}

export default UserSettings;