// 3rd party imports
import React from 'react'

// My imports
import styles from './Button.module.scss'

interface IconButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  color?: string
  icon?: any
}

export const IconButton: React.FC<IconButtonProps> = ({ color = "var(color-gray-1)", icon, ...buttonProps }) => {
  return (
    <button className={styles.button} style={{ borderRadius: '100%', margin: '1rem 3rem', padding: '1rem', backgroundColor: color }}{...buttonProps}>{icon}</button>
  )
}
