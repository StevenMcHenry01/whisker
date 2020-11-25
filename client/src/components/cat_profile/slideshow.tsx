// 3rd party imports
import React, { useState } from 'react'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { MdKeyboardArrowLeft } from 'react-icons/md'

// My imports
import styles from './Slideshow.module.scss'

interface SlideshowProps {
  pics: any
}

export const Slideshow: React.FC<SlideshowProps> = ({ pics }) => {
  const [currentPosition, setCurrentPosition] = useState(0)

  pics = [{ url: '/images/cat.jpeg' }, { url: '/images/logo.png' }]

  return (
    <div className={styles.slide_container}>
      <div className={styles.pic_box}>
        <img src={pics[currentPosition].url} alt="cat" />
        <MdKeyboardArrowRight
          onClick={() =>
            setCurrentPosition((currentPosition) => currentPosition + 1)
          }
          size="2.5rem"
          className={`${styles.arrow} ${styles.right}`}
          style={{
            color: pics[currentPosition + 1]
              ? 'var(--color-white)'
              : '#a8a8a88c',
            pointerEvents: pics[currentPosition + 1] ? 'auto' : 'none',
          }}
        />
        <MdKeyboardArrowLeft
          onClick={() =>
            setCurrentPosition((currentPosition) => currentPosition - 1)
          }
          size="2.5rem"
          className={`${styles.arrow} ${styles.left}`}
          style={{
            color: pics[currentPosition - 1]
              ? 'var(--color-white)'
              : '#a8a8a88c',
            pointerEvents: pics[currentPosition - 1] ? 'auto' : 'none',
          }}
        />
      </div>
    </div>
  )
}
