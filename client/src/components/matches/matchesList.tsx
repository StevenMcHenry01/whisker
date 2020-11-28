// 3rd party imports
import React from 'react'

// My imports
import { useGetMatchesQuery } from '../../generated/graphql'
import { Empty } from '../utils/empty/empty'
import Loading from '../utils/loading/loading'
import { MatchCard } from './matchCard'

export const MatchesList = () => {
  const { data, loading, error } = useGetMatchesQuery()

  if (loading) return <Loading delay={0} />
  if (error) return <div>Error</div>

  if (data?.getMatches?.matches?.length === 0) {
    return (
      <Empty>
        <p>You don&apos;t have any matches.</p>
        <p>Get out there champ!</p>
      </Empty>
    )
  }

  return (
    <div className="grid">
      {data?.getMatches?.matches!.map((match) => {
        return (
          <MatchCard
            key={match.matchCatId}
            matchId={match.matchCatId}
            chatSessionId={match.chatSessionId}
          />
        )
      })}
    </div>
  )
}
