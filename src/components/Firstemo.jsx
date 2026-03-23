import React from 'react'

const Charts = () => {
  return (
    <>
      <svg width="120" height="120" viewBox="0 0 120 120">

      <circle cx="60" cy="60" r="50" fill="#FFD93B" />

      <circle cx="40" cy="50" r="6" fill="#333" />
      <circle cx="80" cy="50" r="6" fill="#333" />

      <path
        d="M35 70 Q60 95 85 70"
        stroke="#333"
        strokeWidth="5"
        fill="transparent"
        strokeLinecap="round"
      />

      <circle cx="60" cy="60" r="55" fill="none" stroke="#FFE66D" strokeWidth="4" />
    </svg>
    </>
  )
}

export default Charts