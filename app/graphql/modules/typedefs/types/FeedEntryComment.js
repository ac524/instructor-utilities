const { gql } = require('graphql-modules');

const FeedEntryComment = gql`
    type FeedEntryComment {
        feedId: ID
        comment: JSONObject
    }
`;

exports.FeedEntryComment = FeedEntryComment;

            