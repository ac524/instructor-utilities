const { gql } = require('graphql-modules');

const { createControllerModule } = require('./utils');

const {
    inputs: {
        StudentPatch
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
        gql`
            type Query {
				roomStudent(roomStudentId: ID): StudentDocument
			}

            type Mutation {
                updateRoomStudent(roomStudentId: ID, data: StudentPatch) : StudentDocument
            }
        `
    ],
    memberPermission: {
        context: "fromStudentId",
        set: "student"
    },
    abilites: [
        "view",
        "update",
        // "delete"
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