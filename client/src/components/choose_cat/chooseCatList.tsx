// 3rd party imports
import Link from 'next/link'
import React from 'react'
import { GetUserCatsQuery } from '../../generated/graphql'
import { Button } from '../utils/buttons/button'
import { Empty } from '../utils/empty/empty'
import { ChooseCatPanel } from './chooseCatPanel'

// My imports

interface CatListProps {
  data: GetUserCatsQuery
}

export const CatList = ({ data }: CatListProps) => {
  return (
    <div>
      <Link href="/create-cat">
        <a>
          <Button>Create New Cat</Button>
        </a>
      </Link>
      {data?.getUserCats?.cats?.length === 0 ? (
        <Empty>
          <p>Looks like you have no cats.</p>
          <p>Feel free to create one!</p>
        </Empty>
      ) : (
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
      )}
    </div>
  )
}
