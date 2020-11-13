// 3rd party imports
import React from 'react'

// My imports

interface FooterProps {}

export const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <footer className="footer">
      <p>Footer Copyright {new Date().getFullYear()}</p>
    </footer>
  )
}
