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

            type Students {
                _id: ID
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

			type Classroom {
				_id: ID
                apps: [ App ]
                date: String
                invites: [ Invite ]
                name: String
                staff: [ Staff ]
                students: [ Students ]
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