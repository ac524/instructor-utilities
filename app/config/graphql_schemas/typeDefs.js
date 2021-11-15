const { gql } = require('apollo-server-express');

const typeDefs = gql`

    type Answer {
        success: Boolean
        message: String
    }

    type Auth {
        token: String
        success: Boolean
        message: String
    }

    input Credentials {
        email: String
        password: String
    }

    type Query {
        test: Answer
    }

    type Mutation {
        login( credentials: Credentials ): Auth
    }
`

module.exports = typeDefs;