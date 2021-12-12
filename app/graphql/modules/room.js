const { createModule, gql } = require('graphql-modules');

const ctrls = require("../../controllers");

const roomModule = createModule({
	id: 'room',
	dirname: __dirname,
	typeDefs: [
        gql`
            type App {
                id: ID
            }

            type Invite {
                id: ID
            }

            type Staff {
                _id: ID
                date: String
                meta: Meta
                role: String
                user: User
            }

            type Student {
                _id: ID
                assignedTo: String
                date: String
                elevation: Int
                feed: String
                meta: Meta
                name: String
                priorityLevel: Int
                recentComments: [Comment]
            }

            type Meta {
                _id: ID
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