// 3rd party imports
import React, { useState } from 'react'
import { HiArrowCircleRight } from 'react-icons/hi'
import { HiArrowCircleLeft } from 'react-icons/hi'
import Loading from '../utils/loading/loading'

// My imports
import styles from './Slideshow.module.scss'

interface SlideshowProps {
  pics: { url: string }[]
}

export const Slideshow: React.FC<SlideshowProps> = ({ pics }) => {
  const [currentPosition, setCurrentPosition] = useState(0)
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <div className={styles.slide_container}>
      <div className={styles.pic_box}>
        {imageLoaded ? null : (
          <div className={`flex center ${styles.loading}`}>
            <Loading />
          </div>
        )}
        <img
          style={imageLoaded ? {} : { display: 'none' }}
          onLoad={() => setImageLoaded(true)}
          src={pics[currentPosition].url}
          alt="cat"
          width="10rem"
        />
        <HiArrowCircleRight
          onClick={() =>
            setCurrentPosition((currentPosition) => currentPosition + 1)
          }
          size="2rem"
          className={`${styles.arrow} ${styles.right} ${
            pics[currentPosition + 1] ? styles.hoverable : null
          }`}
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
          className={`${styles.arrow} ${styles.left} ${
            pics[currentPosition + 1] ? styles.hoverable : null
          }`}
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
