const { gql } = require('apollo-server-express');

const typeDefs = gql`

    type Answer {
        success: Boolean
        message: String
    }

    type AuthUser {
        isVerified: Boolean
        classrooms: [ID]
        _id: ID
        name: String
        email: String
    }

    type Query {
        test: Answer
        authenticated: AuthUser
    }
`

module.exports = typeDefs;