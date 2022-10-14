import { ApolloClient, InMemoryCache, HttpLink, createHttpLink } from "@apollo/client";

const uri = process.env.NODE_ENV === 'development' ? 'https://sage-wordle-backend.herokuapp.com/graphql' : 'http://localhost:4000/graphql'

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
  fetchOptions: {
    mode: 'no-cors'
  }
})

const client = new ApolloClient({

    ssrMode: typeof window === 'undefined',
    link: httpLink,
    cache: new InMemoryCache(),

});

export default client