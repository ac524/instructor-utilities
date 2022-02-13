const { gql } = require('graphql-modules');

const AppTypeDocument = gql`
    type AppTypeDocument {
        id: ID
        isDisabled: Boolean
        name: String
        type: String
    }
`;

exports.AppTypeDocument = AppTypeDocument;