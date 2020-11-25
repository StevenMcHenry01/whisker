// 3rd party imports
import React from 'react'

// My imports
import { useGetMatchesQuery } from '../../generated/graphql'
import { MatchCard } from './matchCard'

export const MatchesList = () => {
  const { data, loading, error } = useGetMatchesQuery()

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error</div>

  return (
    <>
      {data?.getMatches?.matches!.map((match) => {
        return (
          <MatchCard
            key={match.matchCatId}
            matchId={match.matchCatId}
            chatSessionId={match.chatSessionId}
          />
        )
      })}
    </>
  )
}
