// 3rd party imports
import React, { useEffect, useRef } from 'react'
import { BiUpArrowAlt } from 'react-icons/bi'

// My imports
import styles from './Chat.module.scss'

interface ChatFormProps {
  handleSendMessage: any
  message: string
  setMessage: any
}

export const ChatForm: React.FC<ChatFormProps> = ({
  handleSendMessage,
  message,
  setMessage,
}) => {
  const element: any = useRef()

  const shift = () => {
    if (element) {
      element.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  useEffect(() => {
    shift()
  }, [])
  return (
    <form
      onSubmit={handleSendMessage}
      style={{ marginTop: '1.5rem', display: 'flex' }}
    >
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className={styles.chat_input}
      />
      <button
        className={styles.send_button}
        onClick={() => shift()}
        ref={element}
        type="submit"
      >
        <BiUpArrowAlt size="1.6rem" />
      </button>
    </form>
  )
}
