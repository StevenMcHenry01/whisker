// 3rd party imports
import React from 'react'
import { useMeQuery } from '../../generated/graphql'
import { isServer } from '../../utils/isServer'

// My imports

interface MessageProps {
  body: string
  senderId: number
}

export const Message: React.FC<MessageProps> = ({ body, senderId }) => {
  const { data, loading, error } = useMeQuery({
    skip: isServer(),
  })

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error</div>

  return (
    <div
      style={{ color: data?.me?.selectedCat?.id === senderId ? 'blue' : 'red' }}
    >
      {body}
    </div>
  )
}
