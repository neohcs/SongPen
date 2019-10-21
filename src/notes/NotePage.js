import React, { useState } from 'react'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'
import Note from './Note'
import TagFilter from './TagFilter'
import SearchBar from '../SearchBar'
import Page from '../common/Page'
import Header from '../common/Header'
import Navigation from '../app/Navigation'

NotePage.propTypes = {
  onSelectTag: PropTypes.func,
  notes: PropTypes.array,
  tags: PropTypes.array,
  selectedTag: PropTypes.string,
  isRecordingIncluded: PropTypes.bool
}

export default function NotePage({
  onSelectTag,
  notes,
  tags,
  selectedTag,
  onDeleteClick
}) {
  return (
    <Page title={'NotePage'}>
      <Header></Header>
      <Navigation></Navigation>
      <ScrollerStyled>
        {/* <SearchBar></SearchBar> */}
        <TagFilter
          tags={tags}
          onClick={onSelectTag}
          selectedTag={selectedTag}
        />
        {notes.map(note => (
          <Note
            handleDeleteClick={() => onDeleteClick(note)}
            key={note._id}
            _id={note._id}
            title={note.title}
            date={note.date}
            content={note.content
              .split('\n')
              .map(line =>
                line === '' ? <br /> : <LineBreakStyled>{line}</LineBreakStyled>
              )}
            recordings={note.recordings.map(recording => note.recording)}
            tag={note.tag}
          />
        ))}
      </ScrollerStyled>
    </Page>
  )
}

const ScrollerStyled = styled.div`
  display: grid;
  gap: 20px;
  justify-items: center;
  overflow-x: hidden;
  overflow-y: auto;
  scroll-behavior: smooth;
  max-width: 100%;
  padding: 5px 20px;
`
const LineBreakStyled = styled.p`
  margin: 0px;
`
