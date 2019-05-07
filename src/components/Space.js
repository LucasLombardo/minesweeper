import React, { useState } from 'react'

const Space = ({ spaceData, boardState }) => {
    const [showSpace, setShowSpace] = useState(true)

    const handleClick = () => {
        setShowSpace(true);
    }

    const display = spaceData.isMine ? '💣' : spaceData.value;
    return (
        <button onClick={handleClick}>
            {showSpace ? display : ''}
        </button>
    )
}

export default Space
