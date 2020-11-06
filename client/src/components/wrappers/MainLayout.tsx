// 3rd party imports
import styled from 'styled-components'
import Head from 'next/head'

// my imports
import { Footer } from '../Footer'
import { Navbar } from '../navbar/Navbar'

const MainLayoutStyled = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const MainContent = styled.main`
  padding: 3rem 1rem;
  flex: 1;
  display: flex;
`

interface MainLayoutProps {
  children: any
  title?: string
}

export const MainLayout: React.FC = ({ children, title = 'whisker' }: MainLayoutProps) => {
  return (
    <MainLayoutStyled>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <MainContent>{children}</MainContent>
      <Footer />
    </MainLayoutStyled>
  )
}
