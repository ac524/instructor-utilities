const { createModule, createApplication, gql } = require('graphql-modules');

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
    modules: [ myModule ],
});

const schema = application.createSchemaForApollo();

module.exports = {
    schema
}