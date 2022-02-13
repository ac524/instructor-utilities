const { gql } = require('graphql-modules');

const UserDocument = gql`
    type UserDocument {
        _id: ID
        date: String
        email: String
        name: String
    }
`;

exports.UserDocument = UserDocument;

            