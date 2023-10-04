import {
  ApolloClient,
  createHttpLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

let client: any;

//works
// export const client: any = new ApolloClient({
//   uri: "http://defiantswp.local/graphql",
//   cache: new InMemoryCache(),
// });

/**
 * getApolloClient
 */

export function getApolloClient() {
  if (!client) {
    client = _createApolloClient();
  }
  return client;
}

/**
 * createApolloClient
 */

const httpLink = createHttpLink({
  uri: "http://defiantswp.local/graphql",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = process.env.WORDPRESS_AUTH_REFRESH_TOKEN;
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export function _createApolloClient() {
  if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
    return new ApolloClient({
      uri: "http://defiantswp.local/graphql",
      link: authLink.concat(httpLink),
      cache: new InMemoryCache({
        typePolicies: {
          RootQuery: {
            queryType: true,
          },
          RootMutation: {
            mutationType: true,
          },
        },
      }),
    });
  } else {
    return new ApolloClient({
      uri: "http://defiantswp.local/graphql",
      link: new HttpLink({
        uri: "http://defiantswp.local/graphql",
      }),
      cache: new InMemoryCache({
        typePolicies: {
          RootQuery: {
            queryType: true,
          },
          RootMutation: {
            mutationType: true,
          },
        },
      }),
    });
  }
}
