const { gql } = require('graphql-modules');

const RoomDocument = gql`
    type Invite {
        id: ID
    }

    type RoomDocument {
        _id: ID
        apps: [ AppTypeDocument ]
        date: String
        invites: [ Invite ]
        name: String
        staff: [ StaffDocument ]
        students: [ StudentDocument ]
    }
`;

exports.RoomDocument = RoomDocument;