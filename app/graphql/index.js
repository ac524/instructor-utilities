// Import external modules
const { createApplication } = require('graphql-modules');

// Import local modules
const modules = require("./modules");
const context = require("./context");

const schema =
  createApplication({
    modules
  })
  .createSchemaForApollo();

module.exports = {
    schema,
    context
}