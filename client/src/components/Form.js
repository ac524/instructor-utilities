import React, { useEffect, useState } from "react";

import { Form as FormCollection, Button } from "react-bulma-components";

import { ErrorProvider, Error, useInputErrorColor } from "./Errors";

const { Field, Control, Label, Input, Select, Textarea } = FormCollection;

export const createValidator = ({ filters = {}, validators = {} }) => {

    const validator = ( rawData ) => {

        const filterMap = ([ key, rawValue ]) => {
            return [
                key,
                filters[key] ? filters[key](rawValue) : rawValue
            ];
        }

        const data = Object.fromEntries(Object.entries( rawData ).map( filterMap ));

        const validationReducer = ( errors, key ) => {

            if( !validators[key] ) return errors;

            try {
                
                // If there is no validator for the key, return.
                if( !validators[key] ) return errors;

                // Get the validation return.
                const fieldValidation = validators[key]( data, errors );

                // If given an object, append them it as new errors.
                if( fieldValidation !== null && (typeof fieldValidation === 'object') ) return { ...errors, ...fieldValidation };

                // If given false, append a default error.
                if( false === fieldValidation ) return { ...errors, [key]: "Invalid" };

                // If given true or other false values, assume the validation passed and return.
                if( fieldValidation === true || !fieldValidation ) return errors;

                // Othewise, append the validation return.
                return { ...errors, [key]: fieldValidation };

            } catch(err) {

                // Set err message as validation return.
                return { ...errors, [key]: err.message };

            }

        }

        const errors = [ ...Object.keys( data ), "default" ].reduce( validationReducer, {} );

        return [
            // Filtered data
            data,
            // Errors object
            errors,
            // Has Errors boolean
            Boolean(Object.keys(errors).length)
        ];

    }

    // Allows new instances to be created with this validator's options as a base.
    validator.extendNew = ( extOptions ) => createValidator( {
        filters: {
            ...filters,
            ...(extOptions.filters || {})
        },
        validators: {
            ...validators,
            ...(extOptions.validators || {})
        }
    } );

    return validator;
}

export const validateAll = ( rawData, ...validators ) => {

    const validatorsReducer = ( validationState, validator ) => {

        const nextValidationState = validator( validationState[0] );

        return [
            // Updated data from next step
            nextValidationState[0],
            // Merge errors from current and the next
            { ...validationState[1], ...nextValidationState[1] },
            // Has errors if either is true
            validationState[2] || nextValidationState[2]
        ]

    }

    // Allow validators to be passed in as a list or as additional function arguments.
    const toProcess = Array.isArray(validators[0]) ? validators[0] : validators;

    return toProcess.slice( 1 ).reduce( validatorsReducer, toProcess[0]( rawData ) );

}

const fieldDefaultValuesReducer = ( values, { name, value } ) => ({
    ...values,
    [name]: undefined === value ? "" : value
});

export const useFormFields = (fieldsConfig, valueSource) => {

    const [ values, setValues ] = useState( fieldsConfig.reduce(fieldDefaultValuesReducer,{}) );

    useEffect(() => {

        setValues( fieldsConfig.reduce(fieldDefaultValuesReducer,{}) );

    }, [ valueSource ]);

    return [
        fieldsConfig.map( ({name, onMap=field=>field, ...field}) => onMap({
            ...field,
            name,
            value: values[name],
            onChange: e => setValues({ ...values, [name]: e.target.value })
        }) ),
        values
    ];

}

export const RangeInput = ( { id, name, value, color, light, size, ...props } ) => {

    if( !id ) id = `slider-${name}`;

    const classes = ["slider has-output is-fullwidth m-0"];

    if( color ) classes.push(`is-${color}`);
    if( light ) classes.push("is-light");
    if( size ) classes.push(`is-${size}`);

    return (
        <div>
            <input id={id} className={classes.join(" ")} type="range" name={name} value={value || 0} {...props} />
            <output htmlFor={id}>{value}</output>
        </div>
    );

}

export const FormInput = ( { type = "text", options = [], ...props } ) => {

    switch( type ) {
        case "select":
            return (
                <Select className="is-fullwidth" {...props}>
                    {options.map(item => ({ ...item, key: item.value || "empty" })).map( ({ key, value, label }) => <option key={key} value={value}>{label}</option> )}
                </Select>
            );
        case "range":
            return <RangeInput {...props} />
        case "textarea":
            return <Textarea {...props} />
        default:
            return <Input type={type} {...props} />
    }

}

export const FormField = ( { label, type = "text", name, placeholder, value, onChange, options, inputColor, inputProps={}, ...props } ) => {

    const fieldInputProps = {
        name,
        type,
        value,
        onChange: onChange || null,
        ...inputProps
    };

    if( options ) fieldInputProps.options = options;
    if( placeholder ) fieldInputProps.placeholder = placeholder;
    if( !fieldInputProps.color && inputColor ) fieldInputProps.color = inputColor(name);

    return (
        <Field {...props}>
            { label && <Label>{label}</Label>}
            <Control>
                <FormInput {...fieldInputProps} />
                <Error name={name} />
            </Control>
        </Field>
    )

}

const Form = ( {
    fields,
    fieldValueSource,
    validation,
    button,
    buttonText = "Submit",
    moreButtons = [],
    flat,
    className,
    onSubmit,
    ...props
} ) => {

    const [formFields, fieldValues] = useFormFields( fields, fieldValueSource );

    const [ errors, setErrors ] = useState({});

    const handleSubmit = e => {

        e.preventDefault();

        if( !validation ) {
            onSubmit && onSubmit( fieldValues, setErrors );
            return;
        }

        const [ data, inputErrors, hasErrors ] = Array.isArray(validation) ? validateAll( fieldValues, validation ) : validation( fieldValues );

        if( hasErrors ) {
            setErrors( inputErrors );
            return;
        }

        setErrors({});

        onSubmit && onSubmit( data, setErrors );

    }

    const inputErrorColor = useInputErrorColor( errors );

    const classes = className ? [className] : [];

    if(flat) classes.push("is-flat");

    return (
        <form className={classes.join(" ")} onSubmit={handleSubmit} {...props}>
            <ErrorProvider value={errors}>
                <Error name="default" type="message" />
                { formFields.map( field => <FormField key={field.name} inputColor={inputErrorColor} { ...field } /> ) }
            </ErrorProvider>
            {flat ? null : <hr />}
            <div className="is-flex">
                { button ? button : <Button color="primary">{ buttonText }</Button> }
                { moreButtons }
            </div>
        </form>
    );

}

export default Form;