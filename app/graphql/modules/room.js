const { createModule, gql } = require('graphql-modules');
const { GraphQLJSON, GraphQLJSONObject } = require('graphql-type-json');

const ctrls = require("../../controllers");

const roomModule = createModule({
	id: 'room',
	dirname: __dirname,
	typeDefs: [
        gql`
            scalar JSONObject

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
                meta: JSONObject
                role: String
                user: User
            }

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
                data: CommentValueJSON
                date: String
            }

            type CommentValueJSON {
                feedId: ID
                comment: JSONObject
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
		},
        JSONObject: GraphQLJSONObject,
	},
});

module.exports = roomModule