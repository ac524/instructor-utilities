const { gql } = require('graphql-modules');

const FeedEntryCommentDocument = gql`
    type FeedEntryCommentDocument {
        _id: ID
        action: String
        by: String
        data: FeedEntryComment
        date: String
    }
`;

exports.FeedEntryCommentDocument = FeedEntryCommentDocument;

            