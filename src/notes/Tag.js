import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

Tag.propTypes = {
  tag: PropTypes.string
}

export default function Tag({ tag }) {
  return <TagStyled>{tag}</TagStyled>
}

const TagStyled = styled.div`
  display: inline-block;
  border-radius: 7px;
  padding: 2px 15px;
  background: #f0f0f0;
  opacity: 0.5;
  font-size: 14px;
  color: #130307;
`
