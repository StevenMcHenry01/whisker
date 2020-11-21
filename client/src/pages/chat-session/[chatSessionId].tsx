// 3rd party imports
import React from 'react'
import { useRouter } from 'next/router'

// My imports
import withApollo from '../../config/apolloClient'
import { MainLayout } from '../../components/layout/main_layout/mainLayout'
import { ChatSessionWindow } from '../../components/chat_session/chatSessionWindow'
import { useMeQuery } from '../../generated/graphql'
import { isServer } from '../../utils/isServer'

const ChatSession = ({ }) => {
  const router = useRouter()
  const { chatSessionId, receiverId } = router.query

  const { data, loading, error } = useMeQuery({
    skip: isServer(),
  })

  return (
    <MainLayout>
      {loading && <div>Loading...</div>}
      <ChatSessionWindow chatSessionId={chatSessionId as string} me={data} receiverId={receiverId as string} />
    </MainLayout>
  )
}

export default withApollo()(ChatSession)
