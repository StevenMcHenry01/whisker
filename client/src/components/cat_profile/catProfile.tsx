// 3rd party imports
import React from 'react'
import { Cat } from '../../generated/graphql'

// My imports
import styles from './CatProfile.module.scss'
import { Slideshow } from './slideshow'

interface CatProfileProps {
  cat: Cat
  pics: any
  showModal: boolean
}

export const CatProfile: React.FC<CatProfileProps> = ({
  cat,
  pics,
  showModal,
}) => {
  return (
    <div className={styles.container}>
      {showModal ? (
        <>
          <Slideshow pics={pics} />
          <h3>{cat.name}</h3>
        </>
      ) : null}
    </div>
  )
}
