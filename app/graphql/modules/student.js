const { gql } = require('graphql-modules');

const { createControllerModule } = require('./utils');

const studentModule = createControllerModule({
    id: 'room.student',
	dirname: __dirname,
	typeDefs: [
        gql`
            type Test {
                success: Boolean
            }

            type Query {
				roomStudent(roomStudentId: ID): Test
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
    resolvers: {
        Query: {
            roomStudent() {
                return { success: true }
            }
        }
    }
});

module.exports = studentModule;