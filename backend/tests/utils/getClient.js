import 'cross-fetch/polyfill'
import { ApolloClient, HttpLink, InMemoryCache, split, from } from '@apollo/client'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'
import { onError } from '@apollo/client/link/error'

const wsLink = token => process.browser ? new WebSocketLink({
    uri: `ws://localhost:${process.env.HTTP_PORT}`,
    options: {
      reconnect: true,
      timeout: 30000,
      connectionParams: () => {
        if(token) {
          return {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        }
      }
    }
  }) : null

const httpLink = token => new HttpLink({
  uri: `http://localhost:${process.env.HTTP_PORT}`,
  fetch: (uri, options) => {
    options.headers.Authorization = token ? `Bearer ${token}` : "";
    return fetch(uri, options);
  }
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(locations, undefined, 2)}, Path: ${JSON.stringify(path, undefined, 2)}`,
      ),
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const splitLink = token => process.browser ? split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      )
    },
    wsLink(token),
    httpLink(token)
  ) : httpLink(token)

const getClient = (token) => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: from([errorLink, splitLink(token)])
  })
}

export default getClient
