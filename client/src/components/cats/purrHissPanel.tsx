// 3rd party imports
import React from 'react'
import { IconButton } from '../utils/buttons/iconButton'
import { AiFillLike } from 'react-icons/ai'
import { AiFillDislike } from 'react-icons/ai'
import { MeQuery, useDislikeCatMutation, useLikeCatMutation } from '../../generated/graphql'

// My imports

interface PurrHissPanelProps {
  setPosition: React.Dispatch<React.SetStateAction<number>>
  position: number
  me: MeQuery
  catId: number
}

export const PurrHissPanel: React.FC<PurrHissPanelProps> = ({ setPosition, position, me, catId }) => {
  const [likeCat] = useLikeCatMutation()
  const [dislikeCat] = useDislikeCatMutation()

  const handleClick = async (choice: string) => {
    if (!me.me) {
      alert('must be logged in!')
      return
    }
    if (!me.me.selectedCat) {
      alert('must select a cat!')
      return
    }

    let response
    if (choice === 'like') {
      response = await likeCat({ variables: { id: catId } })
      if(response.data.likeCat.match) {
        alert(`You matched with ${response.data.likeCat.match.name}!`)
      }
    } else {
      response = await dislikeCat({ variables: { id: catId } })
    }

    setPosition(position + 1)
  }
  return (
    <div style={{ width: '300px', display: 'flex', justifyContent: 'space-between' }}>
      <IconButton color="var(--color-error)" icon={<AiFillDislike />} onClick={() => handleClick('dislike')} />
      <IconButton color="var(--color-main-purple)" icon={<AiFillLike />} onClick={() => handleClick('like')} />
    </div>
  )
}
