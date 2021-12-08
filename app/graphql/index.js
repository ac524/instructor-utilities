const { createApplication } = require('graphql-modules');

const authModule = require("./modules/auth");
const roomModule = require("./modules/room");

const application = createApplication({
    modules: [
      authModule,
      roomModule
    ],
});

const schema = application.createSchemaForApollo();

module.exports = {
    schema
}