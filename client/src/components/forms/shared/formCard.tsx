// 3rd party imports
import React from 'react'

// My imports

interface FormCardProps {
  header: string
}

export const FormCard: React.FC<FormCardProps> = ({ header, children }) => {
  return (
    <div className="card">
      <div className="header">
        <div>Welcome</div> to <span>Whisker.</span>
      </div>
      <div className="main-content">
        <h3>{header}</h3>
        {children}
      </div>
    </div>
  )
}
