import React, { useState } from "react";

import Form from "components/Form";
import { RichTextDisplay } from "components/Form/components/RichTextEditor";

import { createValidator } from "utils/validation";
import api from "utils/api";
import { useHandleFeedEventResponse } from "pages/Dashboard/utils/feed";

const validateInviteData = createValidator({
    validators: {
        comment: ({ comment }) => Boolean(comment) || "A comment is required"
    }
});

const getEntryComment = entry => entry ? entry.data.comment : "";

const CommentFormEditable = ({ feedId, entry, afterComment = () => {} }) => {

    const [comment, setComment] = useState( () => getEntryComment(entry));

    const handleFeedEventResponse = useHandleFeedEventResponse(feedId);

    const handleSubmit = async (data, setErrors) => {

        try {
            
            let { data: resData } = entry
                ? await api.updateComment( entry._id, data )
                : await api.createComment( feedId, data )

            // Reset the form if not updating an existing comment.
            if(!entry) setComment("");
            
            handleFeedEventResponse( resData, entry ? "update" : "push" );

            afterComment();

        } catch(err) {
            
            if( err && err.response ) setErrors(err.response.data);

        }

    }

    const commentField = {
        placeholder: "Add a comment...",
        name: "comment",
        type: "richtext",
        value: comment
    };

    return (
        <Form
            flat
            fields={[ commentField ]}
            fieldValueSource={comment}
            validation={validateInviteData}
            onSubmit={handleSubmit}
            buttonText="comment"
        />
    );

}

const CommentForm = ({ readOnly = false, entry, ...editableProps }) => {

    return (
        <div style={{flexGrow:0}}>
            {readOnly ? <RichTextDisplay value={getEntryComment(entry)} /> : <CommentFormEditable entry={entry} {...editableProps} />}
        </div>
    );

}

export default CommentForm;