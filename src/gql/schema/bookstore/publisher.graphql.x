# type Publisher {
#     id: ID!
#     name: String!
#     books: [Book!]!
# }

# type Query {
#     publishers: [Publisher!]!
#     publisher(id: ID!): Publisher!
# }

# type Mutation {
#     createPublisher(name: String!): Publisher!
#     updatePublisher(publisherId: ID!, name: String!): Publisher!
# }

# type Subscription {
#     publisherMutated: PublisherMutationPayload!
# }

# type PublisherMutationPayload {
#     mutation: MutationType!
#     node: Publisher!
# }