import { ApolloClient, InMemoryCache, HttpLink, createHttpLink } from "@apollo/client";

const uri = 'https://wordle-backend.sagemaxn.com/graphql'

const client = new ApolloClient({
  ssrMode: typeof window === 'undefined',
  link: new HttpLink({
    uri,
    credentials: 'include',
          headers: {
        a: 'a'
      },
  }),
  cache: new InMemoryCache(),
})

export default client