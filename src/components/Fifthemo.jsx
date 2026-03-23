import React from 'react'

const Fifthemo = () => {
    return (
        <>

            <svg width="120" height="120" viewBox="0 0 120 120">
                {/* Face */}
                <circle cx="60" cy="60" r="50" fill="#FF4C4C" />

                {/* Angry Eyebrows */}
                <line x1="30" y1="40" x2="50" y2="50" stroke="#000" strokeWidth="4" />
                <line x1="90" y1="40" x2="70" y2="50" stroke="#000" strokeWidth="4" />

                {/* Eyes */}
                <circle cx="45" cy="55" r="5" fill="#000" />
                <circle cx="75" cy="55" r="5" fill="#000" />

                {/* Angry Mouth */}
                <path
                    d="M40 85 Q60 70 80 85"
                    stroke="#000"
                    strokeWidth="5"
                    fill="transparent"
                    strokeLinecap="round"
                />

                {/* 0% Label */}
                <text
                    x="60"
                    y="105"
                    textAnchor="middle"
                    fontSize="14"
                    fill="#000"
                    fontWeight="bold"
                >
                </text>
            </svg>


        </>
    )
}

export default Fifthemo