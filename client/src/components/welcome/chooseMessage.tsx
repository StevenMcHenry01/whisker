// 3rd party imports
import React from 'react'
import { AiFillHeart } from 'react-icons/ai'

// My imports
import styles from './WelcomeMessage.module.scss'

export const ChooseMessage = () => {
  return (
    <div className={styles.container}>
      <h3 className={styles.sub_heading}>
        Find your baby&apos;s next baby below{' '}
        <span>
          <AiFillHeart style={{ color: '#ef5d5d' }} />
        </span>
      </h3>
    </div>
  )
}
