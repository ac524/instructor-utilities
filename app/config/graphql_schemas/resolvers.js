const resolvers = {

    Query: {
        test: () => {
            return {success: true, message: 'Hello World.'}
        }
    }
}

module.exports = resolvers