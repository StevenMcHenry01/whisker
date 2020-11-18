// 3rd party imports
import React from 'react'

// My imports

interface CardProps {
  name?: string
  sex?: string
  breed?: string
  imageUrl?: string
}

export const Card: React.FC<CardProps> = ({
  name, sex, breed, imageUrl
}) => {
  return (
    <div className="card">
      <div className="thumb" style={{ backgroundImage: `url(${imageUrl})` }} />
      <div className="main-content">
        <div>
          <h3>{name}</h3>
          <p>{sex}</p>
          <p>{breed}</p>
        </div>
        <p>i</p>
      </div>
    </div>
  )
}
