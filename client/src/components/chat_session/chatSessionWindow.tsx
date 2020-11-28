// 3rd party imports
import { useApolloClient } from '@apollo/client'
import React, { FormEvent, useState } from 'react'

// My imports
import {
  MeQuery,
  useGetChatSessionQuery,
  useSendMessageMutation,
} from '../../generated/graphql'
import { ChatForm } from './chatForm'
import { Message } from './message'
import styles from './Chat.module.scss'
import { MdRefresh } from 'react-icons/md'
import { useSpring, animated } from 'react-spring'
import Loading from '../utils/loading/loading'

interface ChatSessionWindowProps {
  chatSessionId: string
  me: MeQuery
  receiverId: string
}

export const ChatSessionWindow: React.FC<ChatSessionWindowProps> = ({
  chatSessionId,
  receiverId,
}) => {
  const [message, setMessage] = useState('')
  const receiverIdInt = parseInt(receiverId)
  const [props, set] = useSpring(() => ({ opacity: 0 }))

  const client = useApolloClient()

  const { data, loading, error } = useGetChatSessionQuery({
    variables: { id: parseInt(chatSessionId) },
  })
  const [sendMessage] = useSendMessageMutation()

  const handleRefresh = () => {
    set({ opacity: 1 })
    setTimeout(() => {
      set({ opacity: 0 })
    }, 1000)
    client.cache.reset()
  }

  const handleSendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const messageResponse = await sendMessage({
      variables: { body: message, receiverId: receiverIdInt },
    })
    if (messageResponse?.data?.sendMessage.message) {
      client.cache.reset()
      setMessage('')
    }
  }

  if (loading)
    return (
      <div style={{ margin: '0 auto' }}>
        <Loading />
      </div>
    )
  if (error) return <div>Error</div>

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <h2 className={styles.title}>Chat Session</h2>
        <div className={styles.refresh_container}>
          <animated.p style={props}>Refreshed!</animated.p>
          <button className={styles.refresh} onClick={handleRefresh}>
            <MdRefresh size="2rem" color="#f3d55e" />
          </button>
        </div>
      </div>
      <div id="scroll" className={styles.chat_window}>
        {data?.getChatSession?.chatSession?.messages!.map((message, index) => {
          return (
            <Message
              key={index}
              body={message.body}
              senderId={message.senderId}
            />
          )
        })}
        <ChatForm
          handleSendMessage={handleSendMessage}
          message={message}
          setMessage={setMessage}
        />
      </div>
    </div>
  )
}
