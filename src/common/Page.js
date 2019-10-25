import React from 'react'
import styled from 'styled-components/macro'

export default function Page({ children }) {
  return <PageStyled>{children}</PageStyled>
}

const PageStyled = styled.main`
  position: relative;
  display: grid;
  grid-template-rows: auto;
  overflow: auto;
  align-content: flex-start;
  height: 100%;
`
