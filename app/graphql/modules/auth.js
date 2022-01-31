const { createModule, gql } = require('graphql-modules');

const { useAuthentication } = require('../middleware');

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
	middlewares: {
		Query: {
			authenticated: [ ...useAuthentication(false) ]
		}
	},
	resolvers: {
		Query: {
			authenticated: (parent, args, { db, authUser }) => {
				return authUser;np
			}
		},

		Mutation: {
			login: (parent, { credentials }, { db }) => {
				return db.get("auth").login({ credentials });
			}
		}
	},
});

module.exports = auth