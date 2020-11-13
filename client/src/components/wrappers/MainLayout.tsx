// 3rd party imports
import Head from 'next/head'

// my imports
import { Footer } from '../Footer'
import { Navbar } from '../navbar/Navbar'

interface MainLayoutProps {
  children: any
  title?: string
}

export const MainLayout: React.FC = ({ children, title = 'whisker' }: MainLayoutProps) => {
  return (
    <div className="main-layout">
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className="main-content">{children}</div>
      <Footer />
    </div>
  )
}
