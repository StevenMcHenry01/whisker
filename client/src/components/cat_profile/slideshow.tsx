// 3rd party imports
import React, { useState } from 'react'
import { HiArrowCircleRight } from 'react-icons/hi'
import { HiArrowCircleLeft } from 'react-icons/hi'

// My imports
import styles from './Slideshow.module.scss'

interface SlideshowProps {
  pics: { url: string }[]
}

export const Slideshow: React.FC<SlideshowProps> = ({ pics }) => {
  const [currentPosition, setCurrentPosition] = useState(0)

  return (
    <div className={styles.slide_container}>
      <div className={styles.pic_box}>
        <img src={pics[currentPosition].url} alt="cat" width="10rem" />
        <HiArrowCircleRight
          onClick={() =>
            setCurrentPosition((currentPosition) => currentPosition + 1)
          }
          size="2rem"
          className={`${styles.arrow} ${styles.right}`}
          style={{
            color: pics[currentPosition + 1]
              ? 'var(--color-white)'
              : '#a8a8a88c',
            pointerEvents: pics[currentPosition + 1] ? 'auto' : 'none',
          }}
        />
        <HiArrowCircleLeft
          onClick={() =>
            setCurrentPosition((currentPosition) => currentPosition - 1)
          }
          size="2rem"
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
