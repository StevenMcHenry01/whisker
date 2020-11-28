// 3rd party imports
import React from 'react'

// My imports
import { MainLayout } from '../../components/layout/main_layout/mainLayout'
import { useGetMatchesQuery, useMeQuery } from '../../generated/graphql'
import { MatchesList } from '../../components/matches/matchesList'
import withApollo from '../../config/apolloClient'
import { isServer } from '../../utils/isServer'
import Loading from '../../components/utils/loading/loading'
import { useRouter } from 'next/router'

const Matches = () => {
  const { data: meData, loading: meLoading } = useMeQuery({
    skip: isServer(),
  })
  const { data, loading, error } = useGetMatchesQuery()

  const router = useRouter()
  if (error?.message === 'not authenticated') router.push('/login')

  return (
    <MainLayout>
      {meLoading || loading ? (
        <Loading />
      ) : (
        meData &&
        data && (
          <div>
            <h2>{meData.me?.selectedCat?.name}&apos;s matches!</h2>
            <MatchesList data={data} />
          </div>
        )
      )}
    </MainLayout>
  )
}

export default withApollo()(Matches)
