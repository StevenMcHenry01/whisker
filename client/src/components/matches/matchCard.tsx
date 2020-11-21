// 3rd party imports
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

// My imports
import { useGetCatQuery } from '../../generated/graphql'
import { Button } from '../utils/buttons/button'

interface MatchCardProps {
  matchId: number
  chatSessionId: number
}

export const MatchCard: React.FC<MatchCardProps> = ({ matchId, chatSessionId }) => {

  const { data, loading, error } = useGetCatQuery({ variables: { id: matchId } })

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error</div>

  let picUrl
  if (data.getCat.cat.pics.length !== 0) {
    picUrl = data.getCat.cat.pics[0].url
  } else {
    picUrl = '/images/cat.jpeg'
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column', width: '150px', border: '1px solid black', padding: '1rem', borderRadius: '10px', margin: '1rem'}}>
      <h4>{data.getCat.cat.name}</h4>
      <Image src={picUrl} width={100} height={100} />
      <Link href={`/chat-session/${chatSessionId}?receiever=${data.getCat.cat.name}&receiverId=${data.getCat.cat.id}`}>
        <a>
          <Button>Send Message</Button>
        </a>
      </Link>
    </div>
  )
}
