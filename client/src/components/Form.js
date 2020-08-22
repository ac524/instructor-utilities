import React from "react";

import { Field, Control, Label, Input } from 'react-bulma-components/lib/components/form';
import Button from 'react-bulma-components/lib/components/button';
import { ErrorProvider, Error, useInputErrorColor } from "./Errors";

export const FormField = ( { label, type = "text", name, value, placeholder, onChange, inputColor, ...props } ) => {

    const inputProps = {
        name,
        type,
        value,
        placeholder,
        onChange
    };

    if( inputColor ) inputProps.color = inputColor(name);

    return (
        <Field {...props}>
            { !label || <Label>{label}</Label>}
            <Control>
                <Input {...inputProps} />
                <Error name={name} />
            </Control>
        </Field>
    )

}

function Form( { fields, errors, buttonText, ...props } ) {

    const inputErrorColor = useInputErrorColor( errors );

    return (
        <form {...props}>
            <ErrorProvider value={errors}>
                { fields.map( field => <FormField key={field.name} inputColor={inputErrorColor} { ...field } /> ) }
            </ErrorProvider>
            <Button color="primary">{ buttonText || "Submit" }</Button>
        </form>
    )

}

export default Form;