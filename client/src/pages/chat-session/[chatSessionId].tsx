// 3rd party imports
import React from 'react'
import { useRouter } from 'next/router'

// My imports
import withApollo from '../../config/apolloClient'
import { MainLayout } from '../../components/layout/main_layout/mainLayout'
import { ChatSessionWindow } from '../../components/chat_session/chatSessionWindow'
import { MeQuery, useMeQuery } from '../../generated/graphql'
import { isServer } from '../../utils/isServer'
import Loading from '../../components/utils/loading/loading'

const ChatSession = () => {
  const router = useRouter()
  const { chatSessionId, receiverId } = router.query

  const { data, loading } = useMeQuery({
    skip: isServer(),
  })

  if (data?.me === null) {
    router.push('/login')
  }

  return (
    <MainLayout>
      {loading ? (
        <Loading />
      ) : (
        <ChatSessionWindow
          chatSessionId={chatSessionId as string}
          me={data as MeQuery}
          receiverId={receiverId as string}
        />
      )}
    </MainLayout>
  )
}

export default withApollo()(ChatSession)
