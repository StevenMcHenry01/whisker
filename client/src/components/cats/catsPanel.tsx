// 3rd party imports
import React, { useState } from 'react'

// My imports
import { MeQuery, useGetAllCatsQuery } from '../../generated/graphql'
import { isServer } from '../../utils/isServer'
import { PurrHissPanel } from './purrHissPanel'
import { Card } from '../utils/cards/catCard'

interface CatsPanelProps {
  me: MeQuery
}

export const CatsPanel: React.FC<CatsPanelProps> = ({ me }) => {
  const [position, setPosition] = useState(0)
  const { data, loading, error } = useGetAllCatsQuery({
    skip: isServer(),
    // if not logged in or a cat is not selected, just get all cats
    variables: { 
      id: me?.me?.selectedCat ? me.me.selectedCat.id : null,
    }
  })

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error</div>

  return (
    <>
      {!data.getCats.cats[position] ? (
        <p>No cats!</p>
      ) : (
          <>
            <Card
              name={data.getCats.cats[position].name || 'name'}
              sex={data.getCats.cats[position].sex || 'sex'}
              breed={data.getCats.cats[position].breed || 'breed'}
              imageUrl='/images/cat.jpeg'
            />
            <PurrHissPanel me={me} catId={data.getCats.cats[position].id || 1} setPosition={setPosition} position={position} />
          </>
        )
      }
    </>
  )
}
