import React from "react"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import Gameboard from "../components/Gameboard"

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Minesweeper" keywords={[`minesweeper`, `react`]} />
      <Gameboard boardWidth={6} mineCount={6} />
    </Layout>
  )
}

export default IndexPage
