// 3rd party imports
import React from 'react'

// My imports

export const Empty = ({ children }: { children: any }) => {
  return (
    <div
      className="card"
      style={{ textAlign: 'center', padding: '2rem', marginTop: '3rem' }}
    >
      {children}
      <img
        style={{ marginTop: '2rem' }}
        src={'/images/sad.svg'}
        alt="sad face"
      />
    </div>
  )
}
