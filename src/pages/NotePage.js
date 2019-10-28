import React from 'react'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'
import Note from '../notes/Note'
import TagFilter from '../notes/TagFilter'
import Page from '../common/Page'
import Header from '../common/Header'
import Navigation from '../app/Navigation'

NotePage.propTypes = {
  notes: PropTypes.array,
  tags: PropTypes.array,
  selectedTag: PropTypes.string,
  onSelectTag: PropTypes.func,
  onDeleteClick: PropTypes.func
}

export default function NotePage({
  notes,
  tags,
  selectedTag,
  onSelectTag,
  onDeleteClick
}) {
  return (
    <Page title={'NotePage'}>
      <Header></Header>
      <TagFilter tags={tags} onClick={onSelectTag} selectedTag={selectedTag} />
      <ScrollerStyled>
        {notes.map(note => (
          <Note
            handleDeleteClick={() => onDeleteClick(note)}
            key={note._id}
            _id={note._id}
            title={note.title}
            date={note.date}
            content={note.content}
            recordings={note.recordings}
            tag={note.tag}
          />
        ))}
      </ScrollerStyled>
      <Navigation></Navigation>
    </Page>
  )
}

const ScrollerStyled = styled.div`
  display: grid;
  gap: 20px;
  overflow-x: hidden;
  overflow-y: auto;
  scroll-behavior: smooth;
  width: 100%;
  height: 95%;
  padding: 5px 20px 20px;
`
