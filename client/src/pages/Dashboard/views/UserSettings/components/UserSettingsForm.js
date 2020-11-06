import React, { useEffect, useState } from "react";

import Form from "components/Form";
import { useAuthorizedUser, validateUserData } from "utils/auth";
import api from "utils/api";
import { useStoreDispatch, getStoreAction as gsa } from "store";
import { UPDATE_USER } from "store/actions";

const validateUserSettingsData = validateUserData.extendNew({
    validators: {
        password: ({ password, password2 }) => {

            const errors = [];

            if (password || password2) {

                // TODO stronger password validation for both client and server.
                if (password.length < 6) errors.push(["password", "Password must be at least 6 characters"]);

                if (password2 && (password2 != password)) errors.push(["password2", "Confirm password must match"]);
            };

            if (errors.length) return Object.fromEntries(errors);
        }
    }
});

export const useUserSettingFields = () => {

    const [fields, setFields] = useState([]);
    const [state, setState] = useState({});

    const user = useAuthorizedUser();

    useEffect(() => {

        if (!user) return;

        setState({
            name: user.name,
            email: user.email,
            password: "",
            password2: ""
        });

    }, [user, setState]);

    useEffect(() => {

        const onChange = e => setState({ ...state, [e.target.name]: e.target.value });

        setFields([
            {
                label: "Name",
                onChange,
                value: state.name,
                name: "name"
            },
            {
                label: "Email",
                onChange,
                value: state.email,
                name: "email"
            },
            {
                label: "Password",
                onChange,
                value: state.password,
                type: "password",
                name: "password"
            },
            {
                label: "Confirm Password",
                onChange,
                value: state.password2,
                type: "password",
                name: "password2"
            }
        ])

    }, [state, setState, setFields]);

    return [fields, state];

}

const UserSettingsForm = () => {

    const dispatch = useStoreDispatch();
    const user = useAuthorizedUser();
    const [fields, values] = useUserSettingFields();
    const [errors, setErrors] = useState();

    const handleSubmit = async e => {

        e.preventDefault();

        const updateList = Object.entries(values).filter(([key, value]) => value !== user[key]);

        if (updateList.length) {

            const updates = Object.fromEntries(updateList);

            const [data, errors, hasErrors] = validateUserSettingsData(updates);

            if (hasErrors) {
                setErrors(errors);
                return;
            }

            dispatch(gsa(UPDATE_USER, data));

            try {

                await api.updateUser(data);

                //Clearing the errors this feels a little hacky but it's seems to behave reasonably well.
                setErrors();

            } catch (err) {

                if (err.response) setErrors(err.response.data);
            }
        }
    }

    return <Form flat fields={fields} errors={errors} onSubmit={handleSubmit} buttonText="Save" />;

}

export default UserSettingsForm;