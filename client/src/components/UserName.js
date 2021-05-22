import { useAuthorizedUser } from "utils/auth";

const UserName = ({ user: {_id, name }, ...props }) => {

    const { _id: currentUserId } = useAuthorizedUser();

    return <span {...props}>{ _id === currentUserId ? "You" : name }</span>;

}

export default UserName;