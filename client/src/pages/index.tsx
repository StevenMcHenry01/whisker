import { MainLayout } from '../components/wrappers/MainLayout'
import { useMeQuery } from '../generated/graphql'
import { isServer } from '../utils/isServer'

export default function Home(): JSX.Element {
  const { data } = useMeQuery({
    skip: isServer(),
  })
  return (
    <MainLayout>
      <div>Hello</div>
    </MainLayout>
  )
}
