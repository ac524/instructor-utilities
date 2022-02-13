const { gql } = require('graphql-modules');

const Credentials = gql`
    input Credentials {
        email: String
        password: String
    }
`;

exports.Credentials = Credentials;