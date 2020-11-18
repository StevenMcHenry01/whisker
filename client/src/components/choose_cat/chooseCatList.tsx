// 3rd party imports
import React from 'react'
import { useGetUserCatsQuery } from '../../generated/graphql'
import { ChooseCatPanel } from './chooseCatPanel'

// My imports

interface CatListProps {

}

export const CatList: React.FC<CatListProps> = ({ }) => {
  const { data, loading } = useGetUserCatsQuery()

  if (loading) {
    return <div>Loading...</div>
  }

  console.log(data)

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {data.getUserCats.cats.map(cat => {
        return <ChooseCatPanel key={cat.id} name={cat.name} id={cat.id} photoUrl={'/images/cat.jpeg'} />
      })}
    </div>
  )
}
