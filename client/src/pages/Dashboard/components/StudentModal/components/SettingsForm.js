import React, { useEffect, useState } from "react";

import {
    Button
} from "react-bulma-components";

import { getDashboardAction as gda, useStaff, useDashboardDispatch } from "pages/Dashboard/store";
import Form, { createValidator } from "components/Form";
import { ADD_STUDENT, UPDATE_STUDENT } from "pages/Dashboard/store/actions";
import { usePriorityLevel } from "pages/Dashboard/utils/student";
import api from "utils/api";

const validateStudentData = createValidator({
    filters: {
        assignedTo: value => value || null
    },
    validators: {
        name: ({ name }) => name ? null : "Please provide a name"
    }
});

const getFields = ( [ state, setState ], priorityLevel, staff ) => {

    const handleInputUpdate = ( { target: { name, value } } ) => {
        // console.log();
        setState( { ...state, [name]: value } )
    };

    return [
        {
            label: "Student Name",
            placeholder: "Student Name",
            name: "name",
            type: "text",
            value: state.name,
            onChange: handleInputUpdate
        },
        {
            label: "Priority",
            name: "priorityLevel",
            type: "range",
            value: state.priorityLevel,
            onChange: handleInputUpdate,
            inputProps: {
                min: 1,
                max: 10,
                step: 1,
                color: priorityLevel ? priorityLevel.color : null,
                light: true,
                size: "large"
            }
        },
        {
            label: "Staff Assignment",
            name: "assignedTo",
            type: "select",
            options: [ { value: "", label: "Unassigned" }, ...staff.map(({ _id, user: { name } }) => ({ value: _id, label: name })) ],
            value: state.assignedTo,
            onChange: handleInputUpdate
        }
    ];

}

export const useStudentSettingsFormFields = ( student ) => {

    const [studentState, setStudentState] = useState( student );
    const staff = useStaff();
    const priorityLevel = usePriorityLevel( studentState.priorityLevel );

    const [ fields, setFields ] = useState([]);

    useEffect(() => {
        setStudentState( student || {} );
    }, [ student, setStudentState ]);

    useEffect(() => {
        setFields( getFields( [studentState, setStudentState], priorityLevel, staff ) );
    }, [studentState, setStudentState, priorityLevel, staff]);

    // Student form fields configuration.
    return [ fields, studentState ];
    
}

const SettingsForm = ({ roomId, student, afterSubmit }) => {

    const dispatch = useDashboardDispatch();
    const [ errors, setErrors ] = useState( {} );
    const [ fields, values ] = useStudentSettingsFormFields( student );
    const { _id } = student;

    const handleSubmit = async (e) => {

        e.preventDefault();

        const [ data, errors, hasErrors ] = validateStudentData(values);

        if( hasErrors ) {
            setErrors( errors );
            return
        }

        try {

            if( _id ) {

                dispatch(gda( UPDATE_STUDENT, { _id, ...data } ));

                await api.updateStudent( roomId, _id, data );

            } else {

                dispatch(gda( ADD_STUDENT, (await api.createStudent( { ...data, roomId } )).data ));

            }

            if(afterSubmit) afterSubmit();

        } catch(err) {

            if( err.response ) setErrors( err.response.data );

        }

    }

    const button = <Button color="primary" className="is-light has-shadow-light">{(_id ? "Save" : "Create") + " Student"}</Button>;

    return <Form fields={fields} onSubmit={handleSubmit} button={button} errors={errors} />;

}

export default SettingsForm;