// 3rd party imports
import React from 'react'
import { GiWhiteCat } from 'react-icons/gi'
import { FaTransgenderAlt } from 'react-icons/fa'
import { BsFillPersonFill } from 'react-icons/bs'

// My imports
import styles from './CatProfile.module.scss'
import { Slideshow } from './slideshow'

interface CatProfileProps {
  name?: string
  age?: number | null | undefined
  breed?: string | null | undefined
  sex?: string | null | undefined
  bio?: string | null | undefined
  ownerName?: string
  pics: { url: string }[]
}

export const CatProfile: React.FC<CatProfileProps> = ({
  name = 'nameless',
  age,
  breed,
  sex,
  bio,
  pics,
  ownerName,
}) => {
  return (
    <div className={styles.container}>
      <Slideshow pics={pics} />
      <div className={styles.content}>
        <h3>
          {name[0].toUpperCase() + name.substr(1, name.length)}, {age}
        </h3>
        <h4>
          <GiWhiteCat />
          &nbsp;
          {breed || 'No breed'}
        </h4>
        <h4>
          <FaTransgenderAlt />
          &nbsp;{sex || 'No sex'}
        </h4>
        <h4>
          <BsFillPersonFill />
          &nbsp;owned by {ownerName || 'ownerless'}
        </h4>
        <div className={styles.break} />
        <p>{bio || 'No bio'}</p>
      </div>
    </div>
  )
}
