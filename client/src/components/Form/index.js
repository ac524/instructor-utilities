import React, { useEffect, useRef, useState } from "react";

import { Form as FormCollection, Button } from "react-bulma-components";

import { ErrorProvider, Error, useInputErrorColor } from "../Errors";

import { validateAll } from "utils/validation";

const { Field, Control, Label, Input, Select, Textarea } = FormCollection;

const fieldDefaultValuesReducer = (values, { name, value }) => ({
  ...values,
  [name]: undefined === value ? "" : value
});

export const useFormFields = (fieldsConfig, valueSource) => {
  const [values, setValues] = useState(
    fieldsConfig.reduce(fieldDefaultValuesReducer, {})
  );

  useEffect(() => {
    setValues(fieldsConfig.reduce(fieldDefaultValuesReducer, {}));
  }, [valueSource]);

  return [
    fieldsConfig.map(({ name, onMap = field => field, ...field }) =>
      onMap({
        ...field,
        name,
        value: values[name],
        onChange: e => setValues({ ...values, [name]: e.target.value })
      })
    ),
    values
  ];
};

export const RangeInput = ({
  id,
  name,
  value,
  color,
  light,
  size,
  ...props
}) => {
  if (!id) id = `slider-${name}`;

  const classes = ["slider has-output is-fullwidth m-0"];

  if (color) classes.push(`is-${color}`);
  if (light) classes.push("is-light");
  if (size) classes.push(`is-${size}`);

  return (
    <div>
      <input
        id={id}
        className={classes.join(" ")}
        type='range'
        name={name}
        value={value || 0}
        {...props}
      />
      <output htmlFor={id}>{value}</output>
    </div>
  );
};

export const FormInput = ({ type = "text", options = [], ...props }) => {
  switch (type) {
    case "select":
      return (
        <Select className='is-fullwidth' {...props}>
          {options
            .map(item => ({ ...item, key: item.value || "empty" }))
            .map(({ key, value, label }) => (
              <option key={key} value={value}>
                {label}
              </option>
            ))}
        </Select>
      );
    case "range":
      return <RangeInput {...props} />;
    case "textarea":
      return <Textarea {...props} />;
    default:
      return <Input type={type} {...props} />;
  }
};

export const FormField = ({
  label,
  type = "text",
  name,
  placeholder,
  value,
  onChange,
  options,
  inputColor,
  inputProps = {},
  ...props
}) => {
  const fieldInputProps = {
    name,
    type,
    value,
    onChange: onChange || null,
    ...inputProps
  };

  if (options) fieldInputProps.options = options;
  if (placeholder) fieldInputProps.placeholder = placeholder;
  if (!fieldInputProps.color && inputColor)
    fieldInputProps.color = inputColor(name);

  return (
    <Field {...props}>
      {label && <Label>{label}</Label>}
      <Control>
        <FormInput {...fieldInputProps} />
        <Error name={name} />
      </Control>
    </Field>
  );
};

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
