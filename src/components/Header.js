import React from 'react'
import styled from 'styled-components'

const TopBanner = styled.header`
    background: lightcyan;
    padding: 1.5em;
    text-align: center;
    h1 {
        margin: 0;
    }
`

const Header = () => {
  return (
    <TopBanner>
      <h1>Minesweeper 💣 🚩</h1>
    </TopBanner>
  )
}

export default Header
