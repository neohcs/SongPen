import React from 'react'
import styled from 'styled-components/macro'

export default function Header() {
  return <HeaderStyled>SongPen</HeaderStyled>
}

const HeaderStyled = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  background: #17e2cc;
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  font-size: 32px;
  font-weight: bold;
  letter-spacing: 3px;
  color: #08101f; 
`
