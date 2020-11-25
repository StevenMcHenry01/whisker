// 3rd party imports
import React from 'react'
import { IconButton } from '../../utils/buttons/iconButton'
import { AiFillGithub } from 'react-icons/ai'
import { AiFillLinkedin } from 'react-icons/ai'
import { AiFillTwitterCircle } from 'react-icons/ai'

// My imports
import styles from './Footer.module.scss'

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.icons_container}>
        <a
          href="https://github.com/StevenMcHenry01"
          rel="noopener noreferrer"
          target="_blank"
        >
          <IconButton
            icon={<AiFillGithub />}
            color="var(--color-gray-1)"
            size={35}
          />
        </a>
        <a
          href="https://www.linkedin.com/in/stevenmchenry01/"
          rel="noopener noreferrer"
          target="_blank"
        >
          <IconButton
            icon={<AiFillLinkedin />}
            color="var(--color-gray-1)"
            size={35}
          />
        </a>
        <a
          href="https://twitter.com/StevenMcHenry01"
          rel="noopener noreferrer"
          target="_blank"
        >
          <IconButton
            icon={<AiFillTwitterCircle />}
            color="var(--color-gray-1)"
            size={35}
          />
        </a>
      </div>
      <p style={{ margin: '1rem 0 0 0', color: 'var(--color-gray-2)' }}>
        Made by Steven McHenry ©{new Date().getFullYear()}
      </p>
    </footer>
  )
}
