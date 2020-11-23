import React from "react";

import Form, { createValidator } from "components/Form";
import api from "utils/api";
import { useHandleFeedEventResponse } from "pages/Dashboard/utils/feed";

const validateInviteData = createValidator({
    validators: {
        comment: ({ comment }) => Boolean(comment) || "A comment is required"
    }
});

const CommentForm = ({ feedId }) => {

    const handleFeedEventResponse = useHandleFeedEventResponse(feedId);

    const handleSubmit = async (data, setErrors) => {

        try {
            
            handleFeedEventResponse( (await api.createComment( feedId, data )).data );

            setValues({ comment: "" });

        } catch(err) {
            
            if( err && err.response ) setErrors(err.response.data);

        }

    }

    return (
        <div style={{flexGrow:0}}>
            <Form
                flat
                fields={[
                    {
                        placeholder: "Add a comment...",
                        name: "comment",
                        type: "textarea"
                    }
                ]}
                validation={validateInviteData}
                onSubmit={handleSubmit}
                buttonText="comment"
            />
        </div>
    );

}

export default CommentForm;