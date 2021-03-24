import React, { useState } from "react";

import {
    Button
} from "react-bulma-components";

import Date from "components/Date";
import UserName from "components/UserName";
import Icon from "components/Icon";

import FeedEntry from "../components/FeedEntry";
import { useAuthorizedUser } from "utils/auth";
import Dropdown from "components/Dropdown";
import CommentForm from "../components/CommentForm";
import api from "utils/api";

const CommentOptions = ({ entryId, editAction, ...props }) => {

    const deleteComment = async () => {

        await api.deleteComment( entryId );

    }

    return (
        <Dropdown label={<Icon icon="ellipsis-h" />} labelClassName="is-text-link" className="is-right ml-1" ariaLabel="Options to edit this comment" {...props}>
            <Button className="dropdown-item" size="small" onClick={editAction}>
                <Icon icon={["far", "edit"]} />
                <span>Edit</span>
            </Button>
            <Button className="dropdown-item" size="small" onClick={deleteComment}>
                <Icon icon={["far", "trash-alt"]} />
                <span>Delete</span>
            </Button>
        </Dropdown>
    );

}

const Comment = ( { feedId, _id, by, data, date } ) => {

    const user = useAuthorizedUser();
    const [isEditing, setIsEditing] = useState(false);

    const edit = () => setIsEditing(true);
    const closeEdit = () => setIsEditing(false);

    return (
        <FeedEntry block>
            <Button className="start is-circle">
                <span className="icon">{by.name[0]}</span>
            </Button>
            <div className="fill box">
                <div className="is-flex is-size-7">
                    <span><strong><UserName user={by} /></strong> commented:</span>
                    <Date className="end" date={date} />
                    {user._id === by._id && <CommentOptions entryId={_id} editAction={edit} />}
                </div>
                {
                    isEditing

                        ? <CommentForm
                            feedId={feedId}
                            entry={{ _id, by, data }}
                            afterComment={closeEdit}
                            />

                        : <p>{data.comment}</p>
                }
            </div>
        </FeedEntry>
    );

}

export default Comment;