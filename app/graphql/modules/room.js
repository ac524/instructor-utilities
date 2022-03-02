const { gql } = require('graphql-modules');
const { GraphQLJSONObject } = require('graphql-type-json');
const {
    inputs: {
        RoomPatch
    },
    scalars: {
        JSONObject
    },
    types: {
        RoomDocument,
        AppTypeDocument,
        StaffDocument,
        StudentDocument,
        FeedEntryCommentDocument,
        FeedEntryComment,
        UserDocument
    }
} = require('./typedefs');

const { createControllerModule } = require('./utils');

const roomModule = createControllerModule({
    id: 'room',
	dirname: __dirname,
	typeDefs: [
        JSONObject,
        StaffDocument,
        RoomDocument,
        AppTypeDocument,
        StudentDocument,
        FeedEntryCommentDocument,
        FeedEntryComment,
        UserDocument,
        RoomPatch,
        gql`
            type Query {
				room(roomId: ID): RoomDocument
			}

            type Mutation {
				room(roomId: ID): RoomDocument,
                updateRoom(roomId: ID, data: RoomPatch): RoomDocument
			}
        `
    ],
    memberPermission: {
        context: "fromRoomId",
        set: "room"
    },
    abilites: [
        "view",
        "update"
    ],
    resolvers: {
        JSONObject: GraphQLJSONObject
    }
});

module.exports = roomModule