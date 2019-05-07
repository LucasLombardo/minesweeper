import React, { useState, useEffect } from "react"
import styled from "styled-components"

import Space from "./Space"

const SPACE_WIDTH = `40px`

const Board = styled.div`
  display: grid;
  justify-content: center;
  margin: 0 auto;
  grid-gap: 4px;
  button {
    height: ${SPACE_WIDTH};
  }
`

function countContiguousMines(spaces, i) {
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
  const contiguousSpaces = contiguousIndexes.map(index => spaces[index])
  // find contigous mines
  const contiguousMines = contiguousSpaces.filter(s => s.isMine)
  // return count of mines
  return contiguousMines.length
}

function initializeBoard(boardWidth, mineCount) {
  // initialize board with coordinates
  const spaceCount = boardWidth ** 2
  let spaces = []
  for (let i = 0; i < spaceCount; i++) {
    const row = i % boardWidth
    const col = Math.floor(i / boardWidth)
    spaces.push({ coords: [row, col] })
  }
  // assign mines
  for (let i = 0; i < mineCount; i++) {
    let set = false
    while (!set) {
      const randomSpaceIndex = Math.floor(Math.random() * spaceCount)
      const space = spaces[randomSpaceIndex]
      if (!space.isMine) {
        spaces[randomSpaceIndex].value = -1
        spaces[randomSpaceIndex].isMine = true
        set = true
      }
    }
  }
  // assign numbers
  spaces.map((space, i) => {
    if (space.isMine) {
      // if space is a mine, assign val to -1
      space.value = -1
      return space
    } else {
      // otherwise assign value of how many bombs surround
      space.value = countContiguousMines(spaces, i)
      return space
    }
  })
  return spaces
}

const Gameboard = ({ boardWidth, mineCount }) => {
  const [status, setStatus] = useState(`live`)
  const [exposedSpaces, setExposedSpaces] = useState(0)
  const [spaces, setSpaces] = useState([])

  useEffect(() => {
    setSpaces(initializeBoard(boardWidth, mineCount))
  }, [boardWidth, mineCount])

  const boardState = { status, setStatus, exposedSpaces, setExposedSpaces }
  const boardSettings = `${boardWidth}, ${mineCount}`
  return (
    <Board
      style={{ gridTemplateColumns: `repeat(${boardWidth}, ${SPACE_WIDTH})` }}
    >
      {spaces.map((s, i) => (
        <Space
          key={s.coords}
          spaceData={s}
          boardState={boardState}
          boardSettings={boardSettings}
        />
      ))}
    </Board>
  )
}

export default Gameboard
