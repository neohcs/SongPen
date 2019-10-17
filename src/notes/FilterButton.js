import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

FilterButton.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
  onClick: PropTypes.func
}

export default function FilterButton({ onClick, tag, selectedTag }) {
  return (
    <FilterButtonStyled
      onClick={() => onClick(tag)}
      selected={selectedTag === tag ? true : false}
    >
      {tag}
    </FilterButtonStyled>
  )
}

const FilterButtonStyled = styled.button`
  box-shadow: 0 2px 5px #0002;
  border: none;
  border-radius: 7px;
  width: 100px;
  padding: 2px;
  font-size: 14px;
  background: ${props => (props.selected ? '#4db5bf' : '#ecf7f8')};
  font-weight: ${props => (props.selected ? 'bold' : 'normal')};
  color: ${props => (props.selected ? '#f5f8f8' : '#54abbc')};

  :active {
    box-shadow: none;
    background: '#48c0cb';
    font-weight: 'bold';
    color: 'white';
  }
`
