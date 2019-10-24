import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { EditAlt, Trash } from 'styled-icons/boxicons-regular'
import { ArrowSortedDown, ArrowSortedUp, Notes } from 'styled-icons/typicons'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import Tag from './Tag'

Note.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string,
  content: PropTypes.string,
  tag: PropTypes.string,
  recordings: PropTypes.arrayOf(PropTypes.string),
  _id: PropTypes.string,
  handleDeleteClick: PropTypes.func
}

export default function Note({
  title,
  date,
  content,
  tag,
  recordings,
  _id,
  handleDeleteClick
}) {
  const [isNoteExpanded, setIsNoteExpanded] = useState(false)

  function toggleExpandNote() {
    setIsNoteExpanded(!isNoteExpanded)
    console.log(recordings)
  }

  return (
    <NoteStyled key={_id}>
      <DateStyled>{date}</DateStyled>
      <TitleStyled>{title}</TitleStyled>
      {isNoteExpanded ? (
        <>
          <ContentStyled className={'expanded'}>
            {content}
            {recordings.length >= 1 &&
              recordings.map(recording => (
                <AudioStyled src={recording} controls>
                  Your browser does not support the
                  <code>audio</code> element.
                </AudioStyled>
              ))}
          </ContentStyled>
          <NoteCollapseIconStyled
            onClick={toggleExpandNote}
          ></NoteCollapseIconStyled>
          <LinkStyled
            to={{
              pathname: '/edit',
              editNoteData: {
                _id,
                title,
                date,
                content,
                recordings,
                tag
              }
            }}
          >
            <NoteEditIconStyled />
          </LinkStyled>
          <NoteDeleteIconStyled
            onClick={handleDeleteClick}
          ></NoteDeleteIconStyled>
        </>
      ) : (
        <>
          <ContentStyled>{content}</ContentStyled>
          <NoteViewIconStyled onClick={toggleExpandNote}></NoteViewIconStyled>
        </>
      )}
      <Tag tag={tag}></Tag>
      {recordings.length >= 1 && <RecordingIconStyled></RecordingIconStyled>}
    </NoteStyled>
  )
}

const NoteStyled = styled.section`
  position: relative;
  box-shadow: 0 5px 10px #0002;
  width: 90vw;
  padding: 10px 20px 20px;
  background: #fcfcfc;
  font-family: Lucida Grande, Lucida Sans Unicode, Lucida Sans, Geneva, Verdana,
    sans-serif;
`

const DateStyled = styled.div`
  float: left;
  display: block;
  opacity: 0.9;
  font-size: 12px;
  color: #050102;
`

const TitleStyled = styled.h1`
  margin: 40px 0 20px;
  font-size: 18px;
  opacity: 0.9;
  color: #050102;
`

const ContentStyled = styled.span`
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  padding-bottom: 10px;
  height: 60px;
  opacity: 0.9;
  font-size: 16px;
  color: #130307;
  word-wrap: break-word;
  white-space: pre-line;

  &.expanded {
    display: block;
    height: auto;
  }
`
const RecordingIconStyled = styled(Notes)`
  display: inline-block;
  margin-left: 7px;
  height: 30px;
  /* fill: #17e2cc; */
  border: 1px solid lightgrey;
  border-radius: 7px;
  padding: 5px;
  opacity: 0.6;
  fill: #130307;
`

const AudioStyled = styled.audio`
  margin-top: 15px;
  height: 30px;
  width: 100%;
`

const NoteViewIconStyled = styled(ArrowSortedDown)`
  position: absolute;
  right: 10px;
  bottom: 5px;
  display: inline-block;
  margin-top: 5px;
  height: 50px;
  color: #17e2cc;
`

const NoteCollapseIconStyled = styled(ArrowSortedUp)`
  position: absolute;
  right: 10px;
  bottom: 5px;
  display: block;
  margin-top: 5px;
  height: 50px;
  color: #17e2cc;
`

const LinkStyled = styled(NavLink)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  text-decoration: none;
  color: #17e2cc;
  &.active {
    color: #4db5bf;
  }
`

const NoteEditIconStyled = styled(EditAlt)`
  position: absolute;
  top: 10px;
  right: 60px;
  display: inline-block;
  height: 25px;
  color: #17e2cc;
`

const NoteDeleteIconStyled = styled(Trash)`
  position: absolute;
  top: 10px;
  right: 15px;
  display: inline-block;
  height: 25px;
  color: #17e2cc;
`
