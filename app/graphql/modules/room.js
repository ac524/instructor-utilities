const { gql } = require('graphql-modules');
const { GraphQLJSONObject } = require('graphql-type-json');

const { createControllerModule } = require('./utils');

const roomModule = createControllerModule({
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
				room(roomId: ID): Classroom
			}
        `
    ],
    memberPermission: {
        context: "fromRoomId",
        set: "room"
    },
    abilites: [
        "view"
    ],
    resolvers: {
        JSONObject: GraphQLJSONObject
    }
});

module.exports = roomModule