import React, { useState } from "react";

import {
    Heading,
    Card
} from "react-bulma-components";
import { useAuthorizedUser } from "utils/auth";


const NoClassroomNotification = () => {


    const user = useAuthorizedUser();

    return (
        <Card>
            <Card.Content>
                <Heading size={4}>Hey there, {user.name}!</Heading>
                <p>
                    Looks like you don't belong to any classrooms at the moment. This means you'll only have access to your settings until you either create a new classroom or accept an invite as a TA to a new room.
                </p>
            </Card.Content>
        </Card>
    )
}
export default NoClassroomNotification;