import { useEffect, useState } from "react";
import { useClassroom, useStaffByRole } from "pages/Dashboard/store";
import { createValidator } from "utils/validation";
import { getPriorityLevel } from "pages/Dashboard/utils/student";

export const validateStudentData = createValidator({
    filters: {
        priorityLevel: value => parseInt(value),
        assignedTo: value => value || null
    },
    validators: {
        name: ({ name }) => name ? null : "Please provide a name"
    }
});

export const getStaffOptionsList = staff => [ { value: "", label: "Unassigned" }, ...staff.map(({ _id, user: { name } }) => ({ value: _id, label: name })) ];

export const useStudentAppFields = ( studentValues ) => {

    const { apps } = useClassroom();

    return apps.reduce( (fields, app) => {

        if(!app.fields.student.length) return fields;

        return [ ...fields, ...app.fields.student.map((field) => {
            return {
                ...field,
                name: `meta.${field.name}`,
                value: studentValues.meta[field.name],
            }
        }) ]

    }, []);

}

export const useStudentSettingsFormFields = ( student, isBulkCreate ) => {

    const { ta } = useStaffByRole();
    const [ staffOptionsList, setStaffOptionsList ] = useState([]);

    useEffect(() => {

        setStaffOptionsList( getStaffOptionsList(ta || []) );

    }, [ ta, setStaffOptionsList ]);

    const studentValue = student || { meta: {} };

    const appFields = useStudentAppFields( studentValue );

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
        },
        ...(isBulkCreate ? [] : appFields)
    ];

    // Student form fields configuration.
    return fields;
    
}