import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import FilterButton from './FilterButton'

TagFilter.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
  onClick: PropTypes.func
}

export default function TagFilter({ onClick, tags, selectedTag }) {
  return (
    <TagFilterStyled>
      {tags.map(tag => (
        <FilterButton
          selectedTag={selectedTag}
          onClick={() => onClick(tag)}
          tag={tag}
          key={tag}
        ></FilterButton>
      ))}
    </TagFilterStyled>
  )
}

const TagFilterStyled = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  margin: 0;
  width: 100%;
`
