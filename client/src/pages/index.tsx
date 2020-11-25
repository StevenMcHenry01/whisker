// 3rd party imports
import React from 'react'

// my imports
import withApollo from '../config/apolloClient'
import { MainLayout } from '../components/layout/main_layout/mainLayout'
import { useMeQuery } from '../generated/graphql'
import { isServer } from '../utils/isServer'
import { CatsPanel } from '../components/cats/catsPanel'
import { WelcomeMessage } from '../components/welcome/welcomeMessage'
import { ChooseMessage } from '../components/welcome/chooseMessage'
import Loading from '../components/utils/loading/loading'

const Home = () => {
  const { data, loading } = useMeQuery({
    skip: isServer(),
  })

  return (
    <MainLayout>
      {loading || !data ? (
        <Loading />
      ) : (
        <>
          {data?.me === null ? <WelcomeMessage /> : <ChooseMessage />}
          <CatsPanel me={data} />
        </>
      )}
    </MainLayout>
  )
}

export default withApollo({ ssr: true })(Home)
