import { useEffect, useState } from "react";

const fieldDefaultValuesReducer = (values, { name, value }) => ({
    ...values,
    [name]: undefined === value ? "" : value
  });

/**
 * @param {Object} values 
 * @returns {Object}
 */
export const formatValues = ( values ) => {

  return Object
    .entries(values)
    .reduce((obj,entry) => {

      if(entry[0].indexOf(".") < 0)
        // Simple object prop return
        return {
          ...obj,
          [entry[0]]: entry[1]
        };

      // Get each part of the object path.
      const parts = entry[0].split('.');

      // Start a new object.
      const value = { ...(obj[parts[0]]||{}) }
      let steps = 1;

      /**
       * Object drilling concept taken from here.
       * @see https://stackoverflow.com/questions/6393943/convert-javascript-string-in-dot-notation-into-an-object-reference
       **/
      parts.slice(1).reduce((o,p)=> {
        steps++;
        // Update the value for the last step, or replace the level with a new object.
        return o[p] = steps===parts.length ? entry[1] : { ...(o[p]||{}) };
      }, value);

      return {
        ...obj,
        [parts[0]]: value
      };

    }, {});

}

export const useFormFields = (fieldsConfig, valueSource) => {
  const [values, setValues] = useState(
    fieldsConfig.reduce(fieldDefaultValuesReducer, {})
  );

  useEffect(() => {
    setValues(fieldsConfig.reduce(fieldDefaultValuesReducer, {}));
  }, [valueSource]);

  return [
    fieldsConfig.map(({ name, onMap = field => field, ...field }) => {
      return onMap({
        ...field,
        name,
        value: values[name],
        onChange: e => setValues({
          ...values,
          [name]: e.target.value
        })
      })
    }),
    values
  ];
};