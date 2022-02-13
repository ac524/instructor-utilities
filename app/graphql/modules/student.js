const { gql } = require('graphql-modules');

const { createControllerModule } = require('./utils');

const {
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
        gql`
            type Query {
				roomStudent(roomStudentId: ID): StudentDocument
			}
        `
    ],
    memberPermission: {
        context: "fromStudentId",
        set: "student"
    },
    abilites: [
        "view"
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