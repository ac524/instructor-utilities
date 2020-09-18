import React from "react";

import { Form as FormCollection, Button } from "react-bulma-components";

import { ErrorProvider, Error, useInputErrorColor } from "./Errors";

const { Field, Control, Label, Input, Select } = FormCollection;

export const FormInput = ( { type = "text", options = [], ...props } ) => {

    if( type === "select" )

        return (
            <Select className="is-fullwidth" {...props}>
                {options.map(item => ({ ...item, key: item.value || "empty" })).map( ({ key, value, label }) => <option key={key} value={value}>{label}</option> )}
            </Select>
        );

    return <Input type={type} {...props} />

}

export const FormField = ( { label, type = "text", name, state, placeholder, value, onChange, options, inputColor, ...props } ) => {

    const inputProps = {
        name,
        type,
        value: state ? state[0] : value,
        onChange: onChange || (state ? e=>state[1](e.target.value) : null),
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

const Form = ( { fields, stateValues={}, errors = {}, button, buttonText = "Submit", moreButtons = [], ...props } ) => {

    const inputErrorColor = useInputErrorColor( errors );

    return (
        <form {...props}>
            <ErrorProvider value={errors}>
                <Error name="default" type="message" />
                { fields.map( field => <FormField key={field.name} inputColor={inputErrorColor} state={stateValues[field.name]} { ...field } /> ) }
            </ErrorProvider>
            <hr />
            <div className="is-flex">
                { button ? button : <Button color="primary">{ buttonText }</Button> }
                { moreButtons }
            </div>
        </form>
    )

}

export default Form;