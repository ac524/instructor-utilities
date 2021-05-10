import { useState } from "react";

import {
    Button
} from "react-bulma-components";

import { Editor, EditorState, convertFromRaw } from "draft-js";
// import Editor from '@draft-js-plugins/editor';

import Date from "components/Date";
import UserName from "components/UserName";
import Icon from "components/Icon";
import Dropdown from "components/Dropdown";

import { useAuthorizedUser } from "utils/auth";
import api from "utils/api";

import { useHandleFeedEventResponse } from "pages/Dashboard/utils/feed";

import FeedEntry from "../components/FeedEntry";
import CommentForm from "../components/CommentForm";

const CommentOptions = ({ deleteAction, editAction, ...props }) => {

    return (
        <Dropdown label={<Icon icon="ellipsis-h" />} labelClassName="is-text-link" className="is-right ml-1" ariaLabel="Options to edit this comment" {...props}>
            <Button className="dropdown-item" size="small" onClick={editAction}>
                <Icon icon={["far", "edit"]} />
                <span>Edit</span>
            </Button>
            <Button className="dropdown-item" size="small" onClick={deleteAction}>
                <Icon icon={["far", "trash-alt"]} />
                <span>Delete</span>
            </Button>
        </Dropdown>
    );

}

const Comment = ( { feedId, _id, by, data, date } ) => {

    const user = useAuthorizedUser();
    const [isEditing, setIsEditing] = useState(false);

    const handleFeedEventResponse = useHandleFeedEventResponse(feedId);

    const edit = () => setIsEditing(true);
    const closeEdit = () => setIsEditing(false);

    const deleteComment = async () => {

        const {data: deleteRes} = await api.deleteComment( _id );

        handleFeedEventResponse( deleteRes, "delete" );

    }

    const formatComment = () => {

        if( !data.comment ) return null;

        if( typeof data.comment === "string" )

            // Display string based comments as is.
            return <p>data.comment</p>;

        const contentState = convertFromRaw({ entityMap: {}, ...data.comment });
        const editorState = EditorState.createWithContent(contentState);

        return <Editor className="DraftEditor-readonly" editorState={editorState} readOnly={true} />;

    }

    return (
        <FeedEntry block>
            <Button className="start is-circle">
                <span className="icon">{by.name[0]}</span>
            </Button>
            <div className="fill box">
                <div className="is-flex is-size-7">
                    <span><strong><UserName user={by} /></strong> commented:</span>
                    <Date className="end" date={date} />
                    {user._id === by._id && <CommentOptions editAction={edit} deleteAction={deleteComment} />}
                </div>
                <CommentForm
                    feedId={feedId}
                    entry={{ _id, by, data }}
                    afterComment={closeEdit}
                    readOnly={!isEditing}
                />
            </div>
        </FeedEntry>
    );

}

export default Comment;