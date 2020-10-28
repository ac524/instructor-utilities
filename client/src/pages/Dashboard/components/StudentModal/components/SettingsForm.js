import React, { useEffect, useState } from "react";

import {
    Button
} from "react-bulma-components";

import { getDashboardAction as gda, useStaff, useDashboardDispatch, useStaffByRole } from "pages/Dashboard/store";
import Form, { createValidator } from "components/Form";
import { ADD_STUDENT, ADD_STUDENTS, UPDATE_STUDENT } from "pages/Dashboard/store/actionsNames";
import { usePriorityLevel } from "pages/Dashboard/utils/student";
import api from "utils/api";
import { useSocket } from "utils/socket.io";

const validateStudentData = createValidator({
    filters: {
        assignedTo: value => value || null
    },
    validators: {
        name: ({ name }) => name ? null : "Please provide a name"
    }
});

export const getStaffOptionsList = staff => [ { value: "", label: "Unassigned" }, ...staff.map(({ _id, user: { name } }) => ({ value: _id, label: name })) ];

export const useStudentSettingsFormFields = ( student, isBulkCreate ) => {

    const [ studentState, setStudentState ] = useState( student );
    const { ta } = useStaffByRole();
    const [ staffOptionsList, setStaffOptionsList ] = useState([]);
    const priorityLevel = usePriorityLevel( studentState.priorityLevel );

    useEffect(() => {

        setStaffOptionsList( getStaffOptionsList(ta) );

    }, [ ta, setStaffOptionsList ]);

    useEffect(() => {

        setStudentState( student || {} );

    }, [ student, setStudentState ]);

    const handleInputUpdate = ( { target: { name, value } } ) => {
        // console.log();
        setStudentState( { ...studentState, [name]: value } )
    };

    const fields = [
        (
            !student._id && isBulkCreate

            ? {
                label: "Student Names",
                placeholder: "Separate students names by comma or line break (one student per line)",
                name: "name",
                type: "textarea",
                value: studentState.name,
                onChange: handleInputUpdate
            }

            : {
                label: "Student Name",
                placeholder: "Student Name",
                name: "name",
                type: "text",
                value: studentState.name,
                onChange: handleInputUpdate
            }
        ),
        {
            label: "Priority",
            name: "priorityLevel",
            type: "range",
            value: studentState.priorityLevel,
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
            options: staffOptionsList,
            value: studentState.assignedTo,
            onChange: handleInputUpdate
        }
    ];

    // Student form fields configuration.
    return [
        fields,
        studentState
    ];
    
}

const SettingsForm = ({ roomId, student, afterSubmit, isBulkCreate }) => {

    const dispatch = useDashboardDispatch();
    const [ errors, setErrors ] = useState( {} );
    const [ fields, values ] = useStudentSettingsFormFields( student, isBulkCreate );
    const { _id } = student;
    const socket = useSocket();

    const handleSubmit = async (e) => {

        e.preventDefault();

        const [ data, errors, hasErrors ] = validateStudentData(values);

        if( hasErrors ) {
            setErrors( errors );
            return
        }

        try {

            if( _id ) {

                const dispatchData = gda( UPDATE_STUDENT, { _id, ...data } );
                dispatch(dispatchData);

                await api.updateStudent( roomId, _id, data );

                socket.emit( `${roomId}:dispatch`, dispatchData );

            } else {

                if( isBulkCreate ) {

                    const students = data.name.split(/,|\n/).map( name => name.trim() ).filter( name => Boolean(name) ).map( name => ({
                        ...data,
                        name
                    }) );
                    
                    const dispatchData = gda( ADD_STUDENTS, (await api.createStudent( { students, roomId } )).data );
                    dispatch(dispatchData);
                    socket.emit( `${roomId}:dispatch`, dispatchData );

                } else {

                    const dispatchData = gda( ADD_STUDENT, (await api.createStudent( { ...data, roomId } )).data );
                    dispatch(dispatchData);
                    socket.emit( `${roomId}:dispatch`, dispatchData );

                }

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