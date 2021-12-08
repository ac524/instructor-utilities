const ctrls = require("../../controllers");

const resolvers = {

    Query: {

        test: () => {
            return {success: true, message: 'Hello World.'}
        },

        // The authenticated query is now handled by the graphql module auth.js
        // authenticated: (parent, args, context) => {
        //     return ctrls.get('user').findOne({docId: context.user.id})
        // }
    },

    Mutation: {
        // The login mutation is now handled by the graphql module auth.js
        // login: async ( parent, { credentials } ) => {
        //     return await ctrls.get("auth").login({ credentials });
        // }
    }
}

module.exports = resolvers