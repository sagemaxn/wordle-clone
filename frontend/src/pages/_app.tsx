import { ChakraProvider } from '@chakra-ui/react'
import { ApolloProvider, ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";



import theme from '../theme'
import { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  
  const client = new ApolloClient({

      ssrMode: typeof window === 'undefined',
      link: new HttpLink({
        uri: 'http://localhost:4000/graphql',
        credentials: 'include',

      }),
      cache: new InMemoryCache(),

  });

  return (
    <ApolloProvider client={client}>
    <ChakraProvider resetCSS theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
    </ApolloProvider>
  )
}

export default MyApp
