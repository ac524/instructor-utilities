const { gql } = require('graphql-modules');

const StudentNew = gql`
    input StudentNew {
        assignedTo: ID
        name: String
        priorityLevel: Int
        meta: JSONObject
    }
`;

exports.StudentNew = StudentNew;