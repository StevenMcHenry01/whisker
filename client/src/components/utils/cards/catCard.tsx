// 3rd party imports
import React, { useState } from 'react'
import { AiFillInfoCircle } from 'react-icons/ai'

// My imports
import { CatProfile } from '../../cat_profile/catProfile'
import { Modal } from '../modal/modal'
import styles from './CatCard.module.scss'

interface CardProps {
  name?: string
  sex?: string
  breed?: string
  age?: number
  bio?: string
  ownerName: string
  pics?: { url: string }[]
}

export const Card: React.FC<CardProps> = ({
  name,
  sex,
  breed,
  pics,
  age,
  bio,
  ownerName,
}) => {
  const [showModal, setShowModal] = useState(false)

  let fallbackPics = []
  if (!pics || pics.length === 0) {
    fallbackPics.push({ url: '/images/cat.jpeg' })
  } else {
    fallbackPics = pics
  }

  return (
    <>
      <Modal showModal={showModal} setShowModal={setShowModal} top={10}>
        <CatProfile
          name={name}
          age={age}
          breed={breed}
          sex={sex}
          bio={bio}
          ownerName={ownerName}
          showModal={showModal}
          pics={fallbackPics}
        />
      </Modal>
      <div className="card">
        <div
          className="thumb"
          style={{ backgroundImage: `url(${fallbackPics[0].url})` }}
        />
        <div className="main-content">
          <div>
            <h3 style={{ fontWeight: 'bold' }}>{name}</h3>
            <p>{sex}</p>
            <p>{breed}</p>
          </div>
          <AiFillInfoCircle
            size={'2.5rem'}
            color="var(--color-gray-1)"
            onClick={() => setShowModal(true)}
            className={styles.icon}
          />
        </div>
      </div>
    </>
  )
}
