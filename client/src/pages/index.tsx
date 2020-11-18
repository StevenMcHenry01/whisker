// 3rd party imports

// my imports
import { MainLayout } from '../components/layout/main_layout/mainLayout'
import { useMeQuery } from '../generated/graphql'
import { isServer } from '../utils/isServer'
import { CatsPanel } from '../components/cats/catsPanel'

export default function Home(): JSX.Element {
  const { data } = useMeQuery({
    skip: isServer(),
  })
  return (
    <MainLayout>
      {data && <CatsPanel me={data} />}
    </MainLayout>
  )
}
