import '../styles/index.scss'
import { AppProps } from 'next/app'
import React from 'react'
import { ApolloProvider } from '@apollo/client'
import { client } from '../config/apolloClient'

function MyApp({ Component, pageProps }: AppProps): any {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
