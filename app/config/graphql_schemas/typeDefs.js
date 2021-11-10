const { gql } = require('apollo-server-express');

const typeDefs = gql`

    type Answer {
        success: Boolean
        message: String
    }

    type Query {
        test: Answer
    }
`

module.exports = typeDefs;