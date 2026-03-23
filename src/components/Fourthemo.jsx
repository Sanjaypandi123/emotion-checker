import React from 'react'

const Fourthemo = () => {
    return (
        <>

            <svg width="120" height="120" viewBox="0 0 120 120">

                <circle cx="60" cy="60" r="50" fill="#FFD93B" />

                <circle cx="40" cy="50" r="6" fill="#333" />
                <circle cx="80" cy="50" r="6" fill="#333" />

                <path
                    d="M40 85 Q60 65 80 85"
                    stroke="#333"
                    strokeWidth="5"
                    fill="transparent"
                    strokeLinecap="round"
                />

                <text
                    x="60"
                    y="105"
                    textAnchor="middle"
                    fontSize="14"
                    fill="#333"
                    fontWeight="bold"
                >
                </text>
            </svg>



        </>
    )
}

export default Fourthemo