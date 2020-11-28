// 3rd party imports
import React from 'react'
import { useRouter } from 'next/router'

// My imports
import withApollo from '../../config/apolloClient'
import { MainLayout } from '../../components/layout/main_layout/mainLayout'
import { Cat, useGetCatQuery } from '../../generated/graphql'
import Loading from '../../components/utils/loading/loading'
import { CatEditForm } from '../../components/forms/edit_cat/catEditForm'

const EditCat = () => {
  const router = useRouter()
  const { catId } = router.query

  const { data, loading, error } = useGetCatQuery({
    variables: { id: parseInt(catId as string) },
  })

  if (error?.message === 'not authenticated') router.push('/login')

  return (
    <MainLayout>
      {loading ? (
        <Loading />
      ) : (
        data && <CatEditForm cat={data.getCat.cat as Cat} />
      )}
    </MainLayout>
  )
}

export default withApollo()(EditCat)
