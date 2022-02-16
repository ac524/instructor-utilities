const { gql } = require('graphql-modules');

const StudentDocument = gql`
    type StudentDocument {
        _id: ID
        assignedTo: String
        date: String
        elevation: Int
        feed: String
        meta: JSONObject
        name: String
        priorityLevel: Int
        recentComments: [ FeedEntryCommentDocument ]
    }
`;

exports.StudentDocument = StudentDocument;