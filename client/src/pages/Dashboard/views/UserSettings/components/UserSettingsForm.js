import React, { useEffect, useState } from "react";

import Form from "components/Form";
import { useAuthorizedUser } from "utils/auth";
import api from "utils/api";
import { useStoreDispatch, getStoreAction as gsa } from "store";
import { UPDATE_USER } from "store/actions";

export const useUserSettingFields = () => {

    const [ fields, setFields ] = useState([]);
    const [ state, setState ] = useState({});

    const user = useAuthorizedUser();

    useEffect(() => {

        if(!user) return;

        setState({ name: user.name }); 

    }, [user, setState]);

    useEffect(() => {

        const onChange = e => setState({ ...state, [e.target.name]: e.target.value });

        setFields([
            {
                label: "Name",
                onChange,
                value: state.name,
                name: "name"
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
            dispatch(gsa(UPDATE_USER, updates));

            try {

                await api.updateUser( updates );

            } catch(err) {

                if( err.response ) setErrors( err.response.data );

            }

        }

    }

    return <Form fields={fields} errors={errors} onSubmit={handleSubmit} />;

}

export default UserSettingsForm;