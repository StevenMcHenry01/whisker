import '../styles/globals.css'
import { AppProps } from 'next/app'
import { ThemeProvider, CSSReset } from '@chakra-ui/core'
import React from 'react'
import theme from '../styles/theme'
import { ApolloProvider } from '@apollo/client'
import { client } from '../config/apolloClient'

function MyApp({ Component, pageProps }: AppProps): any {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default MyApp
