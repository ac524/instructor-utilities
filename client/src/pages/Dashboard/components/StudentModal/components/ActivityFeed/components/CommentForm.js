import React, { useState } from "react";

import Form, { createValidator } from "components/Form";

const validateInviteData = createValidator({
    validators: {
        comment: ({ email }) => Boolean(email) || "Email is required"
    }
});

const useCommentFormFields = () => {

    const [ state, setState ] = useState({});

    const onChange = e => setState({ ...state, [e.target.name]: e.target.value });

    const fields = [
        {
            placeholder: "Add a comment...",
            name: "comment",
            type: "textarea",
            value: state.comment,
            onChange
        }
    ];

    return [ fields, state ];

}

const CommentForm = () => {

    const [ fields, values ] = useCommentFormFields();
    const [ errors, setErrors ] = useState({});

    const handleSubmit = async e => {

        e.preventDefault();

        try {

            const [ data, errors, hasErrors ] = validateInviteData(values);

            if(hasErrors) {
                setErrors(errors);
                return
            }

            console.log(data);

        } catch(err) {
            
            if( err && err.response ) setErrors(err.response.data);

        }

    }

    return (
        <div style={{flexGrow:0}}>
            <Form flat fields={fields} errors={errors} onSubmit={handleSubmit} buttonText="comment" />
        </div>
    );

}

export default CommentForm;