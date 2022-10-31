const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    launch: LaunchDetails
  }

  type LaunchDetails {
    upcoming: Boolean
    rocket: String
    date: String
    name: String
    flightNumber: Int
  }
`;

const resolvers = {
  Query: {
    launch: () => ({
      upcoming: true,
      rocket: "5e9d0d95eda69974db09d1ed",
      date: "2022-11-01T13:41:00.000Z",
      name: "USSF-44",
      flightNumber: 7,
    }),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => console.log(`server is running at ${url}`));
