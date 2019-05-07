import React from "react"
import styled from "styled-components"

const Adjuster = styled.div`
  border: 1px solid black;
  padding: 1em;
  display: inline-block;
  margin: 1em;
  width: 30%;
  text-align: center;
  span {
    margin-right: 0.7em;
  }
`

const ArrowAdjusters = ({ increment, decrement, children }) => {
  return (
    <Adjuster>
      <span>{children}</span>
      <button onClick={increment}>↑</button>
      <button onClick={decrement}>↓</button>
    </Adjuster>
  )
}

export default ArrowAdjusters
