// 3rd party imports
import { useApolloClient } from '@apollo/client'
import React, { useState } from 'react'
import { MeQuery, useGetAllCatsQuery, useMeQuery } from '../../generated/graphql'
import { isServer } from '../../utils/isServer'
import { PurrHissPanel } from './purrHissPanel'

// My imports
import { Card } from '../utils/cards/catCard'

interface CatsPanelProps {
  me: MeQuery
}

export const CatsPanel: React.FC<CatsPanelProps> = ({ me }) => {
  const [position, setPosition] = useState(0)
  const { data, loading } = useGetAllCatsQuery({
    skip: isServer(),
    variables: { id: me.me.selectedCat.id }
  })

  if (!data) {
    return <div>Loading...</div>
  }

  console.log(data)
  console.log(position)

  return (
    <>
      <Card
        name={data.getCats.cats[position].name}
        sex={data.getCats.cats[position].sex}
        breed={data.getCats.cats[position].breed}
        imageUrl='/images/cat.jpeg'
      />
      <PurrHissPanel me={me} catId={data.getCats.cats[position].id} setPosition={setPosition} position={position} />
    </>
  )
}
