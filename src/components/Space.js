import React, { useState, useEffect } from "react"
import styled from 'styled-components'

const SpaceButton = styled.button`
  border: 1px solid slategray;
  background-color: #DDD;
  outline: none;
  &.shown {
    border: 1px solid lightgray;
    background-color: #FFF;
  }
`;

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

  let display = spaceData.isMine ? "💣" : spaceData.value
  if(display === 0) display = ''
  const unshownDisplay = flagged ? "🚩" : ""
  const classes = showSpace ? "shown" : "unshown";
  return (
    <SpaceButton className={classes} onClick={handleClick} onContextMenu={handleLeftClick}>
      <span>{showSpace ? display : unshownDisplay}</span>
    </SpaceButton>
  )
}

export default Space
