import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const uri =
    process.env.NODE_ENV === 'production'
        ? 'https://wordle-backend.sagemaxn.dev/graphql'
        : 'http://localhost:4000/graphql';

const client = new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({
        uri,
        credentials: 'include',
        headers: {
            a: 'a',
        },
    }),
    cache: new InMemoryCache(),
});

export default client;
