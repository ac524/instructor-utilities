const { createModule, gql } = require('graphql-modules');

const { useAuthentication } = require('../middleware');

const {
	inputs: {
		Credentials
	},
    types: {
        UserDocument,
		Auth
    }
} = require('./typedefs');

const auth = createModule({
	id: 'auth',
	dirname: __dirname,
	typeDefs: [
		UserDocument,
		Auth,
		Credentials,
		gql`
			type Query {
				authenticated: UserDocument
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