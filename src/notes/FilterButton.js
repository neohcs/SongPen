import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

FilterButton.propTypes = {
  tag: PropTypes.string,
  selectedTag: PropTypes.string,
  onClick: PropTypes.func
}

export default function FilterButton({ tag, selectedTag, onClick }) {
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
  padding: 7px;
  font-size: 14px;
  color: #130307;
  background: ${props => (props.selected ? '#17e2cc' : '#f0f0f0')};
  font-weight: ${props => (props.selected ? 'bold' : 'normal')};

  :active {
    box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.1);
    background: '#48c0cb';
    font-weight: 'bold';
    color: 'white';
  }
`
