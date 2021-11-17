const ctrls = require("../../controllers");

const resolvers = {

    Query: {

        test: () => {
            return {success: true, message: 'Hello World.'}
        },

        authenticated: (parent, args, context) => {
            return ctrls.get('user').findOne({docId: context.user.id})
        }
    }
}

module.exports = resolvers