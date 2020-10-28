import React from 'react'
import { ThemeProvider, CSSReset } from '@chakra-ui/core'
import theme from './styles/theme'
import { Navbar } from './components/Navbar/Navbar'
import { Footer } from './components/Footer/Footer'
import { BrowserRouter as Router } from 'react-router-dom'
import { Routes } from './Routes'
import { ContentWrapper } from './components/wrappers/ContentWrapper'
import { ApolloProvider } from '@apollo/client'
import { client } from './config/apolloClient'

const App = () => {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <Router>
          <Navbar />
          <ContentWrapper>
            <Routes />
          </ContentWrapper>
          <Footer />
        </Router>
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default App
