import React from 'react'
import styled from 'styled-components/macro'

export default function newDate() {
  const currentDate = new Date().toLocaleDateString('de')

  return <DateStyled name="date" value={currentDate} readOnly></DateStyled>
}

const DateStyled = styled.input`
  border: 1px solid lightgrey;
  border-radius: 3px;
  width: 95px;
  height: 20px;
  padding: 10px;
  opacity: 0.3;
  font-size: 14px;
  color: #130307;
`
