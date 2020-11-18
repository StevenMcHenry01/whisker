// 3rd party imports
import React from 'react'
import Image from 'next/image'
import { useChooseCatMutation } from '../../generated/graphql'
import { useApolloClient } from '@apollo/client'
import { useRouter } from 'next/router'

// My imports

interface ChooseCatPanelProps {
  name: string
  photoUrl: string
  id: number
}

export const ChooseCatPanel: React.FC<ChooseCatPanelProps> = ({ name, photoUrl, id }) => {

  const [chooseCat] = useChooseCatMutation()

  const apolloClient = useApolloClient()

  const router = useRouter()

  const handleChooseCat = async () => {
    const cat = await chooseCat({ variables: { id } })
    if (cat) {
      apolloClient.resetStore()
      router.push('/')
    }
  }
  return (
    <div style={{ border: '1px solid black' }}>
      <Image src={photoUrl} alt="cat" width={100} height={100} />
      <p>{name}</p>
      <button onClick={handleChooseCat}>Choose Me!</button>
    </div>
  )
}
