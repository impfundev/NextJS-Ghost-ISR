import { ApolloClient, InMemoryCache, ApolloLink, HttpLink } from '@apollo/client';

const httpLink = new HttpLink({ uri: process.env.NEXT_PUBLIC_WORDPRESS_API_URL });

const authLink = new ApolloLink((operation, forward) => {
  // Retrieve the authorization token from local storage.
  const token = process.env.TOKEN_API;

  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : ''
    }
  });

  // Call the next link in the middleware chain.
  return forward(operation);
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
