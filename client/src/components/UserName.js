import React from "react";
import { useAuthorizedUser } from "utils/auth";

const UserName = ({ user: {_id, name }, ...props }) => {

    console.log(_id, name);

    const { _id: currentUserId } = useAuthorizedUser();

    return <span {...props}>{ _id === currentUserId ? "You" : name }</span>;

}

export default UserName;