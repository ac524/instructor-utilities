import React, { useState } from "react";

import Form from "components/Form";
import { createValidator } from "utils/validation";
import api from "utils/api";
import { useHandleFeedEventResponse } from "pages/Dashboard/utils/feed";

const validateInviteData = createValidator({
    validators: {
        comment: ({ comment }) => Boolean(comment) || "A comment is required"
    }
});

const CommentForm = React.forwardRef(
	({ feedId, entry, afterComment = () => {} }, ref) => {

		const [values, setValues] = useState( entry ? entry.data : { comment: "" } );

		const handleFeedEventResponse = useHandleFeedEventResponse(feedId);

		const handleSubmit = async (data, setErrors) => {
			try {
				let { data: resData } = entry
					? await api.updateComment(entry._id, data)
					: await api.createComment(feedId, data);

				// Reset the form if not updating an existing comment.
				if (!entry) setValues({ comment: "" });

				handleFeedEventResponse(resData, entry ? "update" : "push");

				afterComment();
			} catch (err) {
				if (err && err.response) setErrors(err.response.data);
			}
		};

		const commentField = {
			placeholder: "Add a comment...",
			name: "comment",
			type: "textarea",
			value: values.comment,
			row: 2
		};

		return (
			<div style={{ flexGrow: 0 }}>
				<Form
					flat
					fields={[commentField]}
					fieldValueSource={values}
					validation={validateInviteData}
					onSubmit={handleSubmit}
					ref={ref}
					buttonText="comment"
				/>
			</div>
		);
	}
);

export default CommentForm;