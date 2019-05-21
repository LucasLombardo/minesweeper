import React, { useState } from "react"
import styled from "styled-components"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import Gameboard from "../components/Gameboard"
import ArrowAdjusters from "../components/ArrowAdjusters"

const Adjusters = styled.div`
  display: flex;
  justify-content: center;
  transform: scale(0.75);
`

const IndexPage = () => {
  const [width, setWidth] = useState(10)
  const [mines, setMines] = useState(10)
  const [boardClass, setBoardClass] = useState(`normal`)

  const preventSpaceFlash = () => {
    setBoardClass('changing');
    setTimeout(() => setBoardClass('normal'), 100);
  }

  const incrementWidth = () => {
    preventSpaceFlash()
    if (width < 25) setWidth(width + 1)
  }
  const decrementWidth = () => {
    preventSpaceFlash()
    if (width > 1) setWidth(width - 1)
    if ((width - 1) ** 2 < mines) {
      setMines((width - 1) ** 2)
    }
  }

  const incrementMines = () => {
    preventSpaceFlash()
    if (mines < width ** 2) setMines(mines + 1)
  }
  const decrementMines = () => {
    preventSpaceFlash()
    if (mines > 0) setMines(mines - 1)
  }

  return (
    <Layout>
      <Adjusters>
        <ArrowAdjusters increment={incrementWidth} decrement={decrementWidth}>
          width: {width}
        </ArrowAdjusters>
        <ArrowAdjusters increment={incrementMines} decrement={decrementMines}>
          mine count: {mines}
        </ArrowAdjusters>
      </Adjusters>
      <SEO title="Minesweeper" keywords={[`minesweeper`, `react`]} />
      <Gameboard boardClass={boardClass} boardWidth={width} mineCount={mines} preventSpaceFlash={preventSpaceFlash} />
    </Layout>
  )
}

export default IndexPage
