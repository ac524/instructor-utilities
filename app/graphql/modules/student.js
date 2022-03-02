const { gql } = require('graphql-modules');

const { createControllerModule } = require('./utils');

const {
    inputs: {
        StudentPatch,
        StudentNew
    },
    scalars: {
        JSONObject
    },
    types: {
        StudentDocument,
        FeedEntryCommentDocument,
        FeedEntryComment
    }
} = require('./typedefs');

const studentModule = createControllerModule({
    id: 'room.student',
	dirname: __dirname,
	typeDefs: [
        JSONObject,
        StudentDocument,
        FeedEntryCommentDocument,
        FeedEntryComment,
        StudentPatch,
        StudentNew,
        gql`
            type Query {
				roomStudent(roomStudentId: ID): StudentDocument
			}

            type Mutation {
                createRoomStudent(roomId: ID, data: StudentNew) : StudentDocument
                updateRoomStudent(roomStudentId: ID, data: StudentPatch) : StudentDocument
                deleteRoomStudent(roomStudentId: ID) : StudentDocument
            }
        `
    ],
    memberPermission: {
        context: "fromStudentId",
        set: "student"
    },
    abilites: [
        "create",
        "view",
        "update",
        "delete"
    ],
    // resolvers: {
    //     Query: {
    //         roomStudent() {
    //             return { success: true }
    //         }
    //     }
    // }
});

module.exports = studentModule;