import React, { useState, useEffect } from "react"

const Space = ({
  spaceData,
  boardState,
  boardSettings,
  isTriggered,
  propagate,
  triggerSpace,
  checkWin,
}) => {
  const [showSpace, setShowSpace] = useState(false)
  const [flagged, setFlagged] = useState(false)

  useEffect(() => {
    setShowSpace(!!isTriggered)
    if (flagged) {
      const { flagCount, setFlagCount } = boardState
      setFlagCount(flagCount - 1)
      setFlagged(false)
    }
    if (spaceData.value === 0 && isTriggered) propagate()
  }, [boardSettings, isTriggered, spaceData])

  const handleClick = () => {
    // dont allow showing space if it is flagged
    if (flagged) return null
    // if not flagged, reveal space and update board state
    const { status, setStatus } = boardState
    setShowSpace(true)
    triggerSpace()
    if (spaceData.isMine) {
      setStatus("loss")
    } else {
      checkWin()
      if (spaceData.value === 0) propagate()
    }
  }

  const handleLeftClick = e => {
    e.preventDefault()
    if (isTriggered) return null
    const { flagCount, setFlagCount } = boardState
    if (flagged) {
      setFlagCount(flagCount - 1)
    } else {
      setFlagCount(flagCount + 1)
    }
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
