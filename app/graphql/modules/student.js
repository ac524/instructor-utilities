const { gql } = require('graphql-modules');

const { createControllerModule } = require('./utils');

const studentModule = createControllerModule({
    id: 'room.student',
	dirname: __dirname,
	typeDefs: [
        gql`
            type Student {
                _id: ID
                assignedTo: String
                date: String
                elevation: Int
                feed: String
                meta: JSONObject
                name: String
                priorityLevel: Int
                recentComments: [Comment]
            }
            
            type Query {
				roomStudent(roomStudentId: ID): Student
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