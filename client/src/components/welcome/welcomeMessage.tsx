// 3rd party imports
import React from 'react'
import { AiFillHeart } from 'react-icons/ai'

// My imports
import styles from './WelcomeMessage.module.scss'

export const WelcomeMessage = () => {
  return (
    <div className={styles.container}>
      <h1>
        Welcome to <span className={styles.whisker}>Whisker!</span>
      </h1>
      <h3 className={styles.sub_heading}>
        A place for your desperate cats to finally have a chance at love{' '}
        <span>
          <AiFillHeart style={{ color: '#ef5d5d' }} />
        </span>
      </h3>
    </div>
  )
}
