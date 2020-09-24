import React from "react";

import { Form as FormCollection, Button } from "react-bulma-components";

import { ErrorProvider, Error, useInputErrorColor } from "./Errors";

const { Field, Control, Label, Input, Select, Textarea } = FormCollection;

export const createValidator = ({ filters = {}, validators = {} }) => ( rawData ) => {

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

export const FormField = ( { label, type = "text", name, state, placeholder, value, onChange, options, inputColor, inputProps={}, ...props } ) => {

    const fieldInputProps = {
        name,
        type,
        value: state ? state[0] : value,
        onChange: onChange || (state ? e=>state[1](e.target.value) : null),
        ...inputProps
    };

    if( options ) fieldInputProps.options = options;
    if( placeholder ) fieldInputProps.placeholder = placeholder;
    if( !fieldInputProps.color && inputColor ) fieldInputProps.color = inputColor(name);

    return (
        <Field {...props}>
            { !label || <Label>{label}</Label>}
            <Control>
                <FormInput {...fieldInputProps} />
                <Error name={name} />
            </Control>
        </Field>
    )

}

const Form = ( {
    fields,
    stateValues={},
    errors = {},
    button,
    buttonText = "Submit",
    moreButtons = [],
    flat,
    className,
    ...props
} ) => {

    const inputErrorColor = useInputErrorColor( errors );

    const classes = className ? [className] : [];

    if(flat) classes.push("is-flat")

    return (
        <form className={classes.join(" ")} {...props}>
            <ErrorProvider value={errors}>
                <Error name="default" type="message" />
                { fields.map( field => <FormField key={field.name} inputColor={inputErrorColor} state={stateValues[field.name]} { ...field } /> ) }
            </ErrorProvider>
            {flat ? null : <hr />}
            <div className="is-flex">
                { button ? button : <Button color="primary">{ buttonText }</Button> }
                { moreButtons }
            </div>
        </form>
    )

}

export default Form;