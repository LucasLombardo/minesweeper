import React, { useState, useEffect } from "react"
import styled from "styled-components"

import Space from "./Space"
import initializeBoard from "../lib/initializeBoard"

const SPACE_WIDTH = `40px`

const Board = styled.div`
  display: grid;
  justify-content: center;
  margin: 0 auto;
  border: 2px solid slategray;
  width: fit-content;
  padding-top: 1px;
  button {
    height: ${SPACE_WIDTH};
  }
  &.changing {
    span {
      opacity: 0;
    }
  }
`

const Gameboard = ({ boardWidth, mineCount, preventSpaceFlash, boardClass }) => {
  const [status, setStatus] = useState(`live`)
  const [spaces, setSpaces] = useState([])
  const [flagCount, setFlagCount] = useState(0)

  useEffect(() => {
    resetBoard();
  }, [boardWidth, mineCount])

  const resetBoard = () => {
    preventSpaceFlash();
    setSpaces(initializeBoard(boardWidth, mineCount));
    setStatus(`live`);
    setFlagCount(0);
  }

  const checkWin = () => {
    if (status === "live") {
      // get total number of exposed spaces
      const exposedCount = spaces.filter(s => s.isTriggered).length
      const countNeeded = boardWidth ** 2 - mineCount
      if (exposedCount === countNeeded) setStatus("won")
    }
  }

  const triggerSpace = i => {
    // triggers a space to be exposed
    const newSpaces = [...spaces]
    newSpaces[i].isTriggered = true
    setSpaces(newSpaces)
  }

  const propagate = i => {
    // triggers surrounding spaces
    const len = spaces.length
    // get valid contigous spaces
    const w = Math.sqrt(len)
    let indexChecks = [-w, w]
    const leftChecks = [-w - 1, -1, w - 1]
    const rightChecks = [-w + 1, 1, w + 1]
    if (i % w !== 0) indexChecks.push(...leftChecks)
    if ((i + 1) % w !== 0) indexChecks.push(...rightChecks)
    const contiguousIndexes = indexChecks
      .map(check => {
        const contiguousIndex = check + i
        return contiguousIndex
      })
      .filter(index => index > -1 && index < len)
    contiguousIndexes.forEach(index => {
      triggerSpace(index)
    })
    checkWin()
  }

  const boardState = { status, setStatus, flagCount, setFlagCount }
  const boardSettings = `${boardWidth}, ${mineCount}`
  return (
    <>
      <p>{status}</p>
      <p>
        Flags: {flagCount}/{mineCount}
      </p>
      <Board
        style={{ gridTemplateColumns: `repeat(${boardWidth}, ${SPACE_WIDTH})` }}
        className={boardClass}
      >
        {spaces.map((s, i) => (
          <Space
            key={s.coords}
            spaceData={s}
            boardState={boardState}
            boardSettings={boardSettings}
            isTriggered={s.isTriggered}
            propagate={() => propagate(i)}
            triggerSpace={() => triggerSpace(i)}
            checkWin={checkWin}
          />
        ))}
      </Board>
      <button onClick={resetBoard}>Reset</button>
    </>
  )
}

export default Gameboard
