import React from 'react'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'

SearchBar.propTypes = {
  input: PropTypes.string
}

export default function SearchBar() {
  return <SearchBarStyled type="input" placeholder={'Search'}></SearchBarStyled>
}

const SearchBarStyled = styled.input`
  position: relative;
  border: none;
  border-radius: 7px;
  width: 100px;
  height: 20px;
  padding-left: 5px;
  background: #f1f1f1;
  color: grey;
`
