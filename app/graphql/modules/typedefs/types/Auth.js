const { gql } = require('graphql-modules');

const Auth = gql`
    type Auth {
        token: String
        success: Boolean
        user: UserDocument
    }
`;

exports.Auth = Auth;