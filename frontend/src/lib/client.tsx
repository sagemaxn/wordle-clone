import { ApolloClient, InMemoryCache, HttpLink, createHttpLink } from "@apollo/client";

const uri = process.env.NODE_ENV === 'production' ? 'https://sage-wordle-backend.herokuapp.com/graphql' : 'http://localhost:4000/graphql'

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