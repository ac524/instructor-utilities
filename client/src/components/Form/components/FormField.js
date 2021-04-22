import { Form as FormCollection } from "react-bulma-components";

import { FormInput } from "./FormInput"

import { Error } from "components/Errors";

const { Field, Control, Label } = FormCollection;

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
    ifFocus,
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
				<FormInput {...fieldInputProps} ifFocus={ifFocus} />
				<Error name={name} />
			</Control>
		</Field>
	);
  };