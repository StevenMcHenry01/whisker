// 3rd party imports
import Link from 'next/link'
import React from 'react'
import { useGetUserCatsQuery } from '../../generated/graphql'
import { Button } from '../utils/buttons/button'
import { ChooseCatPanel } from './chooseCatPanel'

// My imports

export const CatList = () => {
  const { data, loading, error } = useGetUserCatsQuery()

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error</div>

  return (
    <div>
      <Link href="/create-cat">
        <a>
          <Button>Create New Cat</Button>
        </a>
      </Link>
      <div className="grid">
        {data?.getUserCats?.cats!.map((cat) => {
          return (
            <ChooseCatPanel
              key={cat.id}
              name={cat.name}
              id={cat.id}
              photoUrl={
                cat.pics.length > 0 ? cat.pics[0].url : '/images/cat.jpeg'
              }
            />
          )
        })}
      </div>
    </div>
  )
}