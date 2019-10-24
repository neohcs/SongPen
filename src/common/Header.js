import React from 'react'
import styled from 'styled-components/macro'

export default function Header() {
  return <HeaderStyled>SongPen</HeaderStyled>
}

const HeaderStyled = styled.header`
  display: block;
  text-align: center;
  width: 100vw;
  height: 60px;
  padding: 10px;
  background: #17e2cc;
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  font-size: 36px;
  font-weight: bold;
  letter-spacing: 3px;
  color: #001d20;
`
