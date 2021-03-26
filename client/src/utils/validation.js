export const createValidator = ({ filters = {}, validators = {} }) => {
  const validator = rawData => {
    const filterMap = ([key, rawValue]) => {
      return [key, filters[key] ? filters[key](rawValue) : rawValue];
    };

    const data = Object.fromEntries(Object.entries(rawData).map(filterMap));

    const validationReducer = (errors, key) => {
      if (!validators[key]) return errors;

      try {
        // If there is no validator for the key, return.
        if (!validators[key]) return errors;

        // Get the validation return.
        const fieldValidation = validators[key](data, errors);

        // If given an object, append them it as new errors.
        if (fieldValidation !== null && typeof fieldValidation === "object")
          return { ...errors, ...fieldValidation };

        // If given false, append a default error.
        if (false === fieldValidation) return { ...errors, [key]: "Invalid" };

        // If given true or other false values, assume the validation passed and return.
        if (fieldValidation === true || !fieldValidation) return errors;

        // Othewise, append the validation return.
        return { ...errors, [key]: fieldValidation };
      } catch (err) {
        // Set err message as validation return.
        return { ...errors, [key]: err.message };
      }
    };

    const errors = [...Object.keys(data), "default"].reduce(
      validationReducer,
      {}
    );

    return [
      // Filtered data
      data,
      // Errors object
      errors,
      // Has Errors boolean
      Boolean(Object.keys(errors).length)
    ];
  };

  // Allows new instances to be created with this validator's options as a base.
  validator.extendNew = extOptions =>
    createValidator({
      filters: {
        ...filters,
        ...(extOptions.filters || {})
      },
      validators: {
        ...validators,
        ...(extOptions.validators || {})
      }
    });

  return validator;
};

export const validateAll = (rawData, ...validators) => {
  const validatorsReducer = (validationState, validator) => {
    const nextValidationState = validator(validationState[0]);

    return [
      // Updated data from next step
      nextValidationState[0],
      // Merge errors from current and the next
      { ...validationState[1], ...nextValidationState[1] },
      // Has errors if either is true
      validationState[2] || nextValidationState[2]
    ];
  };

  // Allow validators to be passed in as a list or as additional function arguments.
  const toProcess = Array.isArray(validators[0]) ? validators[0] : validators;

  return toProcess.slice(1).reduce(validatorsReducer, toProcess[0](rawData));
};
