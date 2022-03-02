const { gql } = require('graphql-modules');

const StudentPatch = gql`
    input StudentPatch {
        assignedTo: ID
        name: String
        priorityLevel: Int
        meta: JSONObject
    }
`;

exports.StudentPatch = StudentPatch;