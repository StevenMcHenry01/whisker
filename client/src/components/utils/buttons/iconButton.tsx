// 3rd party imports
import React from 'react'

// My imports
import styles from './Button.module.scss'

interface IconButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  color?: string
  icon?: any
  size?: number
}

export const IconButton: React.FC<IconButtonProps> = ({
  color = 'var(color-gray-1)',
  icon,
  size = 50,
  ...buttonProps
}) => {
  return (
    <button
      className={`${styles.button} ${styles.icon}`}
      style={{
        backgroundColor: color,
        width: `${size}px`,
        height: `${size}px`,
      }}
      {...buttonProps}
    >
      {icon}
    </button>
  )
}
