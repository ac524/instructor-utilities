const { createApplication } = require('graphql-modules');

const authModule = require("./modules/auth");

const application = createApplication({
    modules: [ authModule ],
});

const schema = application.createSchemaForApollo();

module.exports = {
    schema
}