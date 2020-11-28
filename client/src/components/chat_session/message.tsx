// 3rd party imports
import React from 'react'
import { useMeQuery } from '../../generated/graphql'
import { isServer } from '../../utils/isServer'
import Loading from '../utils/loading/loading'

// My imports
import styles from './Chat.module.scss'

interface MessageProps {
  body: string
  senderId: number
}

export const Message: React.FC<MessageProps> = ({ body, senderId }) => {
  const { data, loading, error } = useMeQuery({
    skip: isServer(),
  })

  if (loading) return <Loading />
  if (error) return <div>Error</div>

  return (
    <div
      className={`${styles.message} ${
        data?.me?.selectedCat?.id === senderId ? styles.me : styles.them
      }`}
    >
      {body}
    </div>
  )
}
