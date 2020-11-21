// 3rd party imports
import { useApolloClient } from '@apollo/client'
import React, { FormEvent, useEffect, useRef, useState } from 'react'
import { MeQuery, useGetChatSessionQuery, useSendMessageMutation } from '../../generated/graphql'
import { ChatForm } from './chatForm'
import { Message } from './message'

// My imports

interface ChatSessionWindowProps {
  chatSessionId: string
  me: MeQuery
  receiverId: string
}

export const ChatSessionWindow: React.FC<ChatSessionWindowProps> = ({ chatSessionId, me, receiverId }) => {
  const element: any = useRef()
  const [message, setMessage] = useState('')
  const receiverIdInt = parseInt(receiverId)

  const client = useApolloClient()

  const { data, loading, error } = useGetChatSessionQuery({ variables: { id: parseInt(chatSessionId) } })
  const [sendMessage] = useSendMessageMutation()

  const handleSendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const messageResponse = await sendMessage({
      variables: { body: message, receiverId: receiverIdInt }
    })
    if (messageResponse.data.sendMessage.message) {
      client.cache.reset()
      setMessage('')
    }
  }


  if (loading) return <div>Loading...</div>
  if (error) return <div>Error</div>

  return (
    <div id='scroll' style={{ border: '1px solid black', padding: '2rem', maxHeight: '60vh', overflow: 'scroll' }}>
      <h3>Chat session</h3>
      {data.getChatSession.chatSession.messages.map((message, index) => {
        return <Message key={index} body={message.body} senderId={message.senderId} />
      })}
      <ChatForm handleSendMessage={handleSendMessage} message={message} setMessage={setMessage} />
    </div>
  )
}
