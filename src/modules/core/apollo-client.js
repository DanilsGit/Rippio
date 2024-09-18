import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';

const wsLink = new GraphQLWsLink(createClient({
  url: import.meta.env.VITE_API_URL_GRAPHQL_WS,
  options: {
    reconnect: true,
  },
}));

const myLink = new HttpLink({
  uri: import.meta.env.VITE_API_URL_GRAPHQL,
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  myLink
);

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
});