import React, { useEffect, useState } from "react";

import Form, { createValidator } from "components/Form";
import { useAuthorizedUser } from "utils/auth";
import api from "utils/api";
import { useStoreDispatch, getStoreAction as gsa } from "store";
import { UPDATE_USER } from "store/actions";

const validateUserSettingsData = createValidator({
    validators: {
        name: ({ name }) => Boolean(name) || "Your name is required",
        email: ({ email }) => Boolean(email) || "Email is required"
    }
});

export const useUserSettingFields = () => {

    const [ fields, setFields ] = useState([]);
    const [ state, setState ] = useState({});

    const user = useAuthorizedUser();

    useEffect(() => {

        if(!user) return;

        setState({
            name: user.name,
            email: user.email
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
            }
        ])

    }, [state, setState, setFields]);

    return [ fields, state ];

}

const UserSettingsForm = () => {

    const dispatch = useStoreDispatch();
    const user = useAuthorizedUser();
    const [ fields, values ] = useUserSettingFields();
    const [ errors, setErrors ] = useState();

    const handleSubmit = async e => {

        e.preventDefault();

        const updateList = Object.entries(values).filter( ([key,value]) => value !== user[key] );

        if( updateList.length ) {

            const updates = Object.fromEntries( updateList );

            const [ data, errors, hasErrors ] = validateUserSettingsData( updates );

            if( hasErrors ) {
                setErrors(errors);
                return;
            }

            dispatch(gsa(UPDATE_USER, data));

            try {

                await api.updateUser( data );

            } catch(err) {

                if( err.response ) setErrors( err.response.data );

            }

        }

    }

    return <Form flat fields={fields} errors={errors} onSubmit={handleSubmit} />;

}

export default UserSettingsForm;