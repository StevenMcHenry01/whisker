// 3rd party imports
import React, { useEffect, useRef } from 'react'

// My imports

interface ChatFormProps {
  handleSendMessage: any
  message: string
  setMessage: any
}

export const ChatForm: React.FC<ChatFormProps> = ({ handleSendMessage, message, setMessage }) => {

  const element: any = useRef()

  useEffect(() => {
    if (element) {
      element.current.scrollIntoView()
    }
  }, [])
  return (
    <form onSubmit={handleSendMessage}>
      <input type="text" value={message} onChange={e => setMessage(e.target.value)} />
      <button ref={element} type="submit">Send message</button>
    </form>
  )
}
