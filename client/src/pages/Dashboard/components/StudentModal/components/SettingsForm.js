import React, { useEffect, useState } from "react";

import {
    Button
} from "react-bulma-components";

import { getDashboardAction as gda, useDashboardDispatch, useStaffByRole } from "pages/Dashboard/store";
import { getStaffOptionsList } from "pages/Dashboard/utils/staff";
import Form from "components/Form";
import { createValidator } from "utils/validation";
import { ADD_STUDENT, ADD_STUDENTS, UPDATE_STUDENT } from "pages/Dashboard/store/actionsNames";
import { getPriorityLevel } from "pages/Dashboard/utils/student";
import api from "utils/api";
import { useSocket } from "utils/socket.io";

const validateStudentData = createValidator({
    filters: {
        priorityLevel: value => parseInt(value),
        assignedTo: value => value || null
    },
    validators: {
        name: ({ name }) => name ? null : "Please provide a name"
    }
});

export const useStudentSettingsFormFields = ( student, isBulkCreate ) => {

    const { ta } = useStaffByRole();
    const [ staffOptionsList, setStaffOptionsList ] = useState([]);

    useEffect(() => {

        setStaffOptionsList( getStaffOptionsList(ta || []) );

    }, [ ta, setStaffOptionsList ]);

    const studentValue = student || {};

    const fields = [
        (
            !student._id && isBulkCreate

            ? {
                label: "Student Names",
                placeholder: "Separate students names by comma or line break (one student per line)",
                name: "name",
                type: "textarea",
                value: studentValue.name,
            }

            : {
                label: "Student Name",
                placeholder: "Student Name",
                name: "name",
                type: "text",
                value: studentValue.name,
            }
        ),
        {
            label: "Priority (At Risk Factor)",
            name: "priorityLevel",
            type: "range",
            value: studentValue.priorityLevel,
            inputProps: {
                min: 1,
                max: 10,
                step: 1,
                light: true,
                size: "large"
            },
            /**
             * Allows updates to be applied to input configurations using the live input value.
             */
            onMap: ({value,inputProps,...field}) => ({
                ...field,
                value,
                inputProps: {
                    ...inputProps,
                    color: getPriorityLevel( value ).color,
                }
            })
        },
        {
            label: "Staff Assignment",
            name: "assignedTo",
            type: "select",
            options: staffOptionsList,
            value: studentValue.assignedTo || ""
        }
    ];

    // Student form fields configuration.
    return fields;
    
}

const SettingsForm = ({ roomId, student, afterSubmit, isBulkCreate }) => {

    const dispatch = useDashboardDispatch();
    const fields = useStudentSettingsFormFields( student, isBulkCreate );
    const { _id } = student;
    const socket = useSocket();

    const handleSubmit = async (data, setErrors) => {

        try {

            if( _id ) {

                const dispatchData = gda( UPDATE_STUDENT, { _id, ...data } );

                dispatch(dispatchData);

                await api.updateStudent( _id, data );

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

    return <Form
            fields={fields}
            fieldValueSource={student._id}
            validation={validateStudentData}
            onSubmit={handleSubmit}
            button={button}
            />;

}

export default SettingsForm;