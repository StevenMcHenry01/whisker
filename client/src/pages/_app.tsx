import '../styles/index.scss'
import { AppProps } from 'next/app'
import React from 'react'

function MyApp({ Component, pageProps }: AppProps): any {
  return <Component {...pageProps} />
}

export default MyApp
