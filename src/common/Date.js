import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

Date.propTypes = {
  date: PropTypes.string
}

export default function newDate() {
  let currentDay = new Date().getDate()
  let currentMonth = new Date().getMonth() + 1
  let currentYear = new Date().getFullYear()
  // const currentHours = new Date().getHours()
  // const currentMinutes = new Date().getMinutes()

  let currentDate = currentDay + '.' + currentMonth + '.' + currentYear

  return <DateStyled name="date" value={currentDate}></DateStyled>
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
