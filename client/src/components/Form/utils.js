import { useEffect, useState } from "react";

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