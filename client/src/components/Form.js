import React from "react";

import { Form as FormCollection, Button } from "react-bulma-components";

import { ErrorProvider, Error, useInputErrorColor } from "./Errors";

const { Field, Control, Label, Input, Select } = FormCollection;

export const FormInput = ( { type = "text", options = [], ...props } ) => {

    if( type === "select" )

        return (
            <Select className="is-fullwidth" {...props}>
                {options.map( ({ value, label }) => <option key={value} value={value}>{label}</option> )}
            </Select>
        );

    return <Input type={type} {...props} />

}

export const FormField = ( { label, type = "text", name, value, placeholder, onChange, options, inputColor, ...props } ) => {

    const inputProps = {
        name,
        type,
        value,
        onChange
    };

    if( options ) inputProps.options = options;
    if( placeholder ) inputProps.placeholder = placeholder;
    if( inputColor ) inputProps.color = inputColor(name);

    return (
        <Field {...props}>
            { !label || <Label>{label}</Label>}
            <Control>
                <FormInput {...inputProps} />
                <Error name={name} />
            </Control>
        </Field>
    )

}

function Form( { fields, errors = {}, buttonText = "Submit", moreButtons = [], ...props } ) {

    const inputErrorColor = useInputErrorColor( errors );

    return (
        <form {...props}>
            <ErrorProvider value={errors}>
                <Error name="default" type="message" />
                { fields.map( field => <FormField key={field.name} inputColor={inputErrorColor} { ...field } /> ) }
            </ErrorProvider>
            <div className="is-flex">
                <Button color="primary">{ buttonText }</Button>
                { moreButtons }
            </div>
        </form>
    )

}

export default Form;