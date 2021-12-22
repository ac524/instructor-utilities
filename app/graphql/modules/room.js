const { createModule, gql } = require('graphql-modules');

const ctrls = require("../../controllers");

const roomModule = createModule({
	id: 'room',
	dirname: __dirname,
	typeDefs: [
        gql`
            type App {
                id: ID
                isDisabled: Boolean
                name: String
                type: String
            }

            type Invite {
                id: ID
            }

            type Staff {
                _id: ID
                date: String
                meta: StaffMeta
                role: String
                user: User
            }

            type StaffMeta {
                _id: ID
            }

            type Student {
                _id: ID
                assignedTo: String
                date: String
                elevation: Int
                feed: String
                meta: StudentMeta
                name: String
                priorityLevel: Int
                recentComments: [Comment]
            }

            type StudentMeta {
                _id: ID
                githubUser: String
            }

            type User {
				_id: ID
                date: String
				email: String
				name: String
			}

            type Comment {
                _id: ID
                action: String
                by: String
                data: CommentValue
                date: String
            }

            type CommentValue {
                comment: String
            }

			type Classroom {
				_id: ID
                apps: [ App ]
                date: String
                invites: [ Invite ]
                name: String
                staff: [ Staff ]
                students: [ Student ]
			}

            type Query {
				room(docId: ID): Classroom
			}
        `
    ],
	resolvers: {
		Query: {
            room: (parent, { docId }) => {
                return ctrls.get('room').findOne({ docId });
            }
		}
	},
});

module.exports = roomModule