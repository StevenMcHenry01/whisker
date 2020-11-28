// 3rd party imports
import React from 'react'

// My imports
import { GetMatchesQuery } from '../../generated/graphql'
import { Empty } from '../utils/empty/empty'
import { MatchCard } from './matchCard'

interface MatchesListProps {
  data: GetMatchesQuery
}

export const MatchesList = ({ data }: MatchesListProps) => {
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
