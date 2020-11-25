// 3rd party imports
import React from 'react'

// My imports
import styles from './Button.module.scss'

interface buttonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  colorVariant?:
    | 'purple'
    | 'pink'
    | 'salmon'
    | 'orange'
    | 'light-orange'
    | 'yellow'
}

export const Button: React.FC<buttonProps> = ({
  children,
  colorVariant = 'light-orange',
  ...buttonProps
}) => {
  return (
    <button
      className={styles.button}
      style={{ backgroundColor: `var(--color-main-${colorVariant})` }}
      {...buttonProps}
    >
      {' '}
      {children}
    </button>
  )
}
