// 3rd party imports
import React from 'react'

// My imports
import { MainLayout } from '../../components/layout/main_layout/mainLayout'
import { useMeQuery } from '../../generated/graphql'
import { MatchesList } from '../../components/matches/matchesList'
import withApollo from '../../config/apolloClient'

const Matches = ({ }) => {
  const { data, loading, error } = useMeQuery()

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error</div>

  if (!data?.me?.selectedCat) {
    return null
  }

  return (
    <MainLayout>
      <div>
        {<h2>{data.me.selectedCat.name}'s matches!</h2>}
        <MatchesList />
      </div>
    </MainLayout>
  )
}

export default withApollo()(Matches)
