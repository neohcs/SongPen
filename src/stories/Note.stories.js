import React from 'react'
import Note, {
  DateStyled,
  TitleStyled,
  ContentStyled,
  Tag,
  NoteViewIconStyled
} from '../notes/Note'

export default {
  title: 'Note'
}

export const note = () => (
  <Note date="1.1.2009" title="New SongNote" content="No notes here" tag="test">
    <DateStyled></DateStyled>
    <TitleStyled></TitleStyled>
    <ContentStyled></ContentStyled>
    <Tag></Tag>
    <NoteViewIconStyled></NoteViewIconStyled>
  </Note>
)
