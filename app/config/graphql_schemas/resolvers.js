const ctrls = require("../../controllers");

const resolvers = {

    Query: {
        test: () => {
            return {success: true, message: 'Hello World.'}
        }
    },

    Mutation: {
        login: async ( parent, { credentials } ) => {
            
            const userLoggedIn = await ctrls.get("auth").login({credentials});
            
            return {
                token: userLoggedIn.token,
                success: true,
                message: 'Logged In'
            }
        }
    }
}

module.exports = resolvers