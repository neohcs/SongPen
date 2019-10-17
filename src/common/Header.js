import React from 'react'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'

Header.propTypes = {
  text: PropTypes.string
}

export default function Header() {
  return <HeaderStyled>SongPen</HeaderStyled>
}

const HeaderStyled = styled.header`
  display: block;
  text-align: center;
  width: 100vw;
  height: 60px;
  padding: 10px;
  background: #4db5bf;
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  font-size: 36px;
  font-weight: bold;
  letter-spacing: 3px;
  color: #f5f8f8;
`
