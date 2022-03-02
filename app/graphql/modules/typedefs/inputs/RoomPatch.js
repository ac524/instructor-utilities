const { gql } = require('graphql-modules');

const RoomPatch = gql`
    input RoomPatch {
        name: String
    }
`;

exports.RoomPatch = RoomPatch;