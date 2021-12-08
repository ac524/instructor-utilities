const { createModule, gql } = require('graphql-modules');

const ctrls = require("../../controllers");

const auth = createModule({
	id: 'auth',
	dirname: __dirname,
	typeDefs: [
		gql`
			type User {
				_id: ID
				email: String
				isVerified: Boolean
				name: String
				classrooms: [ID]
			}

			type Auth {
				token: String
				success: Boolean
				user: User
			}

			input Credentials {
				email: String
				password: String
			}

			type Query {
				authenticated: User
			}

			type Mutation {
				login( credentials: Credentials ): Auth
			}
	  	`,
	],
	resolvers: {
		Query: {
			authenticated: (parent, args, context) => {
				return ctrls.get('user').findOne({ docId: context.user.id })
			}
		},

		Mutation: {
			login: async (parent, { credentials }) => {
				return await ctrls.get("auth").login({ credentials });
			}
		}
	},
});

module.exports = auth