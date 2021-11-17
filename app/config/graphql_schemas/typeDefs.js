const { gql } = require('apollo-server-express');

const typeDefs = gql`

    type Answer {
        success: Boolean
        message: String
    }

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
        test: Answer
        authenticated: User
    }

    type Mutation {
        login( credentials: Credentials ): Auth
    }
`

module.exports = typeDefs;