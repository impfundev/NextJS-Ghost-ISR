import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://cmsnya.fandomnesia.com/graphql",
  cache: new InMemoryCache(),
});
