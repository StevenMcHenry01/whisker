// 3rd party imports
import React from 'react'

// My imports
import { GetMatchesQuery, useGetMatchesQuery } from '../../generated/graphql'
import { MatchCard } from './matchCard'

interface MatchesListProps {
}

export const MatchesList: React.FC<MatchesListProps> = ({ }) => {
  const { data, loading, error } = useGetMatchesQuery()

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error</div>

  return (
    <>
      {data.getMatches.matches.map(match => {
        return (
          <MatchCard key={match.matchCatId} matchId={match.matchCatId} chatSessionId={match.chatSessionId} />
        )
      })}
    </>
  )
}
