const { createModule, createApplication, gql } = require('graphql-modules');
const auth = require("./modules/auth");

const myModule = createModule({
  id: 'my-module',
  dirname: __dirname,
  typeDefs: [
    gql`
        type Query {
            hello: String!
        }
    `,
  ],
  resolvers: {
    Query: {
      hello: () => 'world',
    },
  },
});

const application = createApplication({
    modules: [ myModule, auth ],
});

const schema = application.createSchemaForApollo();

module.exports = {
    schema
}