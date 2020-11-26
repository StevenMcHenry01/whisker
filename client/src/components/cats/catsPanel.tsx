// 3rd party imports
import React, { useState } from 'react'

// My imports
import { MeQuery, useGetAllCatsQuery } from '../../generated/graphql'
import { isServer } from '../../utils/isServer'
import { PurrHissPanel } from './purrHissPanel'
import { Card } from '../utils/cards/catCard'
import Loading from '../utils/loading/loading'

interface CatsPanelProps {
  me: MeQuery
}

export const CatsPanel = ({ me }: CatsPanelProps) => {
  const [position, setPosition] = useState(0)
  const { data, loading, error } = useGetAllCatsQuery({
    skip: isServer(),
    // if not logged in or a cat is not selected, just get all cats
    variables: {
      id: me?.me?.selectedCat ? me.me.selectedCat.id : null,
    },
  })

  if (loading) return <Loading />
  if (error) return <div>Error</div>

  if (data)
    return (
      <>
        {!data.getCats?.cats![position] ? (
          <div
            className="card"
            style={{ textAlign: 'center', padding: '2rem', marginTop: '3rem' }}
          >
            <p>There doesn&apos;t seem to be any more</p>
            <p>cats in your area.</p>
            <img
              style={{ marginTop: '2rem' }}
              src={'/images/sad.svg'}
              alt="sad face"
            />
          </div>
        ) : (
          <div>
            <Card
              name={data.getCats?.cats![position].name || 'name'}
              sex={data.getCats.cats![position].sex || 'sex'}
              breed={data.getCats.cats![position].breed || 'breed'}
              age={data.getCats.cats![position].age || 0}
              bio={data.getCats.cats![position].bio || 'No bio'}
              ownerName={
                data.getCats.cats![position].owner.username || 'ownerless'
              }
              pics={data.getCats.cats![position].pics}
            />
            <PurrHissPanel
              me={me}
              catId={data.getCats.cats![position].id || 1}
              setPosition={setPosition}
              position={position}
            />
          </div>
        )}
      </>
    )
  return null
}
