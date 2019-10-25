import React from 'react'
import styled from 'styled-components/macro'

export default function Header() {
  return <HeaderStyled>SongPen</HeaderStyled>
}

const HeaderStyled = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 375px;
  height: 50px;
  background: #17e2cc;
  /* font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif; */
  font-size: 30px;
  font-weight: bold;
  letter-spacing: 2px;
  color: #050102;
`
