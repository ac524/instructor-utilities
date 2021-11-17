const ctrls = require("../../controllers");

const resolvers = {

    Query: {
        test: () => {
            return {success: true, message: 'Hello World.'}
        }
    },

    Mutation: {
        login: async ( parent, { credentials } ) => {
            
            return await ctrls.get("auth").login({ credentials });
            
        }
    }
}

module.exports = resolvers