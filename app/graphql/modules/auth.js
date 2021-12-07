const { createModule, gql } = require('graphql-modules');

export const auth = createModule({
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

	},
});