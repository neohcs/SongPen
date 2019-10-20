import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { EditAlt, Trash } from 'styled-icons/boxicons-regular'
import { ArrowSortedDown, ArrowSortedUp, Notes } from 'styled-icons/typicons'
import { PlayCircle } from 'styled-icons/fa-regular'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'
import Tag from './Tag'

Note.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string, //update this to dynamic date
  content: PropTypes.string,
  tag: PropTypes.string,
  recording: PropTypes.string //or array? -> arrayOf(PropTypes.string)
  // id, too?
}

export default function Note({
  title,
  date,
  content,
  tag,
  recording,
  _id,
  handleDeleteClick
}) {
  const [isNoteExpanded, setIsNoteExpanded] = useState(false)

  function toggleExpandNote() {
    setIsNoteExpanded(!isNoteExpanded)
  }

  return (
    <NoteStyled>
      <DateStyled>{date}</DateStyled>
      <TitleStyled>{title}</TitleStyled>
      {isNoteExpanded ? (
        <>
          <ContentStyled className={'expanded'}>
            {content}
            {recording && (
              <PlayBarStyled>
                <PlayIconStyled></PlayIconStyled>
              </PlayBarStyled>
            )}
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
                recording,
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
      {recording && <RecordingIconStyled></RecordingIconStyled>}
    </NoteStyled>
  )
}

const NoteStyled = styled.section`
  position: relative;
  box-shadow: 0 5px 10px #0002;
  width: 90vw;
  padding: 10px 20px 20px;
  background: #f8f8f8;
  font-family: Lucida Grande, Lucida Sans Unicode, Lucida Sans, Geneva, Verdana,
    sans-serif;
`

const DateStyled = styled.div`
  float: right;
  display: block;
  margin-right: -10px;
  font-size: 12px;
  color: #3997a0;
`

const TitleStyled = styled.h1`
  font-size: 18px;
  color: #3997a0;
`

const ContentStyled = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 60px;
  font-size: 16px;
  color: #54abbc;
  word-wrap: break-word;

  &.expanded {
    display: block;
    height: auto;
  }
`
const RecordingIconStyled = styled(Notes)`
  display: inline-block;
  height: 25px;
  fill: #54abbc;
`

const PlayBarStyled = styled.div`
  position: relative;
  margin-top: 20px;
  border: 1px solid lightgrey;
  border-radius: 7px;
  height: 30px;
  padding: 4px;
  background: white;
`

const PlayIconStyled = styled(PlayCircle)`
  position: absolute;
  height: 20px;
  color: #ffc187;
`

const NoteViewIconStyled = styled(ArrowSortedDown)`
  position: absolute;
  right: 10px;
  bottom: 5px;
  display: inline-block;
  height: 50px;
  color: #ffc187;
`

const NoteCollapseIconStyled = styled(ArrowSortedUp)`
  position: absolute;
  right: 10px;
  bottom: 5px;
  display: block;
  height: 50px;
  color: #ffc187;
`

const LinkStyled = styled(NavLink)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  text-decoration: none;
  color: #ffc187;
  &.active {
    color: #4db5bf;
  }
`

const NoteEditIconStyled = styled(EditAlt)`
  position: absolute;
  top: 30px;
  right: 50px;
  display: inline-block;
  height: 25px;
  color: #ffc187;
`

const NoteDeleteIconStyled = styled(Trash)`
  position: absolute;
  top: 30px;
  right: 10px;
  display: inline-block;
  height: 25px;
  color: #ffc187;
`
