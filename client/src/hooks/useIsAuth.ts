import { useMeQuery } from '../generated/graphql'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export const useIsAuth = () => {
  const { data, loading } = useMeQuery()
  const router = useRouter()

  // if not logged in, reroute to login page
  useEffect(() => {
    if (!loading && !data?.me) {
      router.replace('/login?next=' + router.pathname)
    }
  }, [loading, data, router])
}
