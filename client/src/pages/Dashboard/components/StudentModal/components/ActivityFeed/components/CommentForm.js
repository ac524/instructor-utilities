import React, { useState } from "react";

import Form, { createValidator } from "components/Form";
import api from "utils/api";
import { useDashboardDispatch, getDashboardAction as gda } from "pages/Dashboard/store";
import { ADD_STUDENT_FEED_ITEM } from "pages/Dashboard/store/actions";

const validateInviteData = createValidator({
    validators: {
        comment: ({ comment }) => Boolean(comment) || "A comment is required"
    }
});

const useCommentFormFields = () => {

    const [ state, setState ] = useState({ comment: "" });

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

    return [ fields, state, setState ];

}

const CommentForm = ({ feedId }) => {

    const dispatch = useDashboardDispatch();
    const [ fields, values, setValues ] = useCommentFormFields();
    const [ errors, setErrors ] = useState({});

    const handleSubmit = async e => {

        e.preventDefault();

        try {

            const [ data, errors, hasErrors ] = validateInviteData(values);

            if(hasErrors) {
                setErrors(errors);
                return
            }

            dispatch(gda( ADD_STUDENT_FEED_ITEM, (await api.createComment( feedId, data )).data ) );

            setValues({ comment: "" });

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