import {
    Message
} from "react-bulma-components";

import { useAuthorizedUser } from "utils/auth";

const NoClassroomNotification = () => {

    const user = useAuthorizedUser();

    return (
        <Message color = "info">
            <Message.Body>
                Hey there, {user.name}! Looks like you don't belong to any classrooms at the moment. This means you'll only have access to your settings until you either create a new classroom or accept an invite as a TA to a new room.
            </Message.Body>
        </Message>
    );

}

export default NoClassroomNotification;