import React, { useState, useEffect } from "react"

const Space = ({
  spaceData,
  boardState,
  boardSettings,
  isTriggered,
  propagate,
}) => {
  const [showSpace, setShowSpace] = useState(false)
  const [flagged, setFlagged] = useState(false)

  useEffect(() => {
    setShowSpace(!!isTriggered)
    setFlagged(false)
    if (spaceData.value === 0 && isTriggered) propagate()
  }, [boardSettings, isTriggered])

  const handleClick = () => {
    const { exposedSpaces, setExposedSpaces, status, setStatus } = boardState
    setShowSpace(true)
    setExposedSpaces(exposedSpaces + 1)
    if (spaceData.value === 0) propagate()
  }

  const handleLeftClick = e => {
    e.preventDefault()
    setFlagged(!flagged)
  }

  const display = spaceData.isMine ? "💣" : spaceData.value
  const unshownDisplay = flagged ? "🚩" : ""
  return (
    <button onClick={handleClick} onContextMenu={handleLeftClick}>
      {showSpace ? display : unshownDisplay}
    </button>
  )
}

export default Space
