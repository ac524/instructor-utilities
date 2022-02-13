const { gql } = require('graphql-modules');

const StaffDocument = gql`
    type StaffDocument {
        _id: ID
        date: String
        meta: JSONObject
        role: String
        user: UserDocument
    }
`;

exports.StaffDocument = StaffDocument;

            