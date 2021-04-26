import { Form as FormCollection } from "react-bulma-components";

import { RangeInput } from "./RangeInput";
import { RichTextEditor } from "./RichTextEditor";

const { Input, Select } = FormCollection;

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
      case "richtext":
        return <RichTextEditor {...props} />;
      case "textarea":
        return <Textarea {...props} />;
      default:
        return <Input type={type} {...props} />;
    }
  };