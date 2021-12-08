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

            type Staff {
                _id: ID
            }

            type Students {
                _id: ID
            }

			type Classroom {
				_id: ID
                apps: [ App ]
                date: String
                staff: [Staff]
                students: [Students]
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