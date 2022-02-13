const { gql } = require('graphql-modules');

const FeedEntryDocument = gql`
    type FeedEntryDocument {
        _id: ID
        action: String
        by: String
        data: FeedEntryComment
        date: String
    }
`;

exports.FeedEntryDocument = FeedEntryDocument;

            