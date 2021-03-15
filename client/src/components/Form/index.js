import React, { useRef, useState } from "react";

import { Form as FormCollection, Button } from "react-bulma-components";

import { ErrorProvider, Error, useInputErrorColor } from "../Errors";

import { validateAll } from "utils/validation";

import { useFormFields } from "./utils"

import { FormField } from "./components"

const { Field, Control, Label, Input, Select, Textarea } = FormCollection;

// export const FormField = ({
//   label,
//   type = "text",
//   name,
//   placeholder,
//   value,
//   onChange,
//   options,
//   inputColor,
//   inputProps = {},
//   ...props
// }) => {
//   const fieldInputProps = {
//     name,
//     type,
//     value,
//     onChange: onChange || null,
//     ...inputProps
//   };

//   if (options) fieldInputProps.options = options;
//   if (placeholder) fieldInputProps.placeholder = placeholder;
//   if (!fieldInputProps.color && inputColor)
//     fieldInputProps.color = inputColor(name);

//   return (
//     <Field {...props}>
//       {label && <Label>{label}</Label>}
//       <Control>
//         <FormInput {...fieldInputProps} />
//         <Error name={name} />
//       </Control>
//     </Field>
//   );
// };

const Form = ({
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
}) => {
  const [formFields, fieldValues] = useFormFields(fields, fieldValueSource);

  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  const formRef = useRef();

  const submitData = async data => {
    setIsProcessing(true);
    onSubmit && (await onSubmit(data, setErrors));
    if (formRef.current) setIsProcessing(false);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (isProcessing) return;

    if (!validation) {
      submitData(fieldValues);
      return;
    }

    const [data, inputErrors, hasErrors] = Array.isArray(validation)
      ? validateAll(fieldValues, validation)
      : validation(fieldValues);

    if (hasErrors) {
      setErrors(inputErrors);
      return;
    }

    setErrors({});

    submitData(data);
  };

  const inputErrorColor = useInputErrorColor(errors);

  const classes = className ? [className] : [];

  if (flat) classes.push("is-flat");

  return (
    <form
      ref={formRef}
      className={classes.join(" ")}
      onSubmit={handleSubmit}
      {...props}
    >
      <ErrorProvider value={errors}>
        <Error name='default' type='message' />
        {formFields.map(field => (
          <FormField key={field.name} inputColor={inputErrorColor} {...field} />
        ))}
      </ErrorProvider>
      {flat ? null : <hr />}
      <div className='is-flex'>
        {button ? (
          button
        ) : (
          <Button color='primary' loading={isProcessing}>
            {buttonText}
          </Button>
        )}
        {moreButtons}
      </div>
    </form>
  );
};

export default Form;
