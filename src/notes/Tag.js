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
  margin-top: 10px;
  border: 1px solid lightgrey;
  border-radius: 7px;
  padding: 7px 15px;
  opacity: 0.6;
  font-size: 14px;
  color: #130307;
`
