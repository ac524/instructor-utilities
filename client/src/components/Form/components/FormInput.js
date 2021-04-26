import { Form as FormCollection } from "react-bulma-components";

import { RangeInput } from "./RangeInput"

const { Input, Select, Textarea } = FormCollection;

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
        return <Textarea {...props} style={{borderStyle:"none", borderTopStyle: "solid", borderBottomStyle: "solid", borderRadius: 0}}/>;
      default:
        return <Input type={type} {...props} />;
    }
  };