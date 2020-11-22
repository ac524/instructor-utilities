const Validator = require("fastest-validator");
const  { ObjectID } = require("mongodb");

const v = new Validator({
    defaults: {
        objectID: {
            ObjectID
        }
    }
});

const compile = schema => v.compile(schema);

const mapErrors = errors => errors.reduce( (errors, {field, message}) => ({ ...errors, [field]: message }), {} );

const validator = {
    compile,
    mapErrors
};

module.exports = validator;