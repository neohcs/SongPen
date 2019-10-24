import React, { useState } from 'react'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'
import Page from '../common/Page'
import Header from '../common/Header'
import Navigation from '../app/Navigation'
import Date from '../common/Date'
import RecorderPlayer from '../media/RecorderPlayer'

EditPage.propTypes = {
  onSubmit: PropTypes.func,
  editNoteDate: PropTypes.object
}

export default function EditPage({ onSubmit, editNoteData }) {
  const [title, setTitle] = useState(editNoteData.title)
  const [content, setContent] = useState(editNoteData.content)
  const [label, setLabel] = useState(editNoteData.tag)
  const [recordings, setRecordings] = useState(editNoteData.recordings)

  function handleSubmit(event) {
    event.preventDefault()
    const form = event.target
    const formData = new FormData(form)
    let data = Object.fromEntries(formData)
    data = { ...data, recordings }
    onSubmit(editNoteData._id, data)
  }

  return (
    <Page title={'EditPage'}>
      <Header></Header>
      <Navigation></Navigation>
      <FormStyled onSubmit={handleSubmit}>
        <Date name="date"></Date>
        <InputTitleStyled
          required
          name="title"
          value={title}
          onChange={event => setTitle(event.target.value)}
          maxLength="20"
          autoFocus
        ></InputTitleStyled>
        <InputContentStyled
          name="content"
          value={content}
          onChange={event => setContent(event.target.value)}
        ></InputContentStyled>
        <RecorderPlayer
          name="recordings"
          recordingsState={[recordings, setRecordings]}
        ></RecorderPlayer>
        <div>
          <SelectLabelStyled>Fancy to change the tag?</SelectLabelStyled>
          <SelectTagStyled
            name="tag"
            value={label}
            onChange={event => setLabel(event.target.value)}
          >
            <option name="tag" value="started">
              started
            </option>
            <option name="tag" value="advanced">
              advanced
            </option>
            <option name="tag" value="completed">
              completed
            </option>
          </SelectTagStyled>
        </div>
        <ButtonStyled
          onClick={() => {
            window.location = 'http://localhost:3000/'
          }}
        >
          Save changes
        </ButtonStyled>
        <ButtonStyled
          secondary
          onClick={() => {
            window.location = 'http://localhost:3000/'
          }}
        >
          Cancel
        </ButtonStyled>
      </FormStyled>
    </Page>
  )
}

const FormStyled = styled.form`
  display: grid;
  gap: 20px;
  justify-items: center;
  overflow-y: auto;
  scroll-behavior: smooth;
  margin-bottom: 20px;
  padding: 0 20px 20px;
`

const InputTitleStyled = styled.input`
  box-shadow: 0 5px 10px #0002;
  border: 1px solid lightgrey;
  border-radius: 3px;
  width: 100%;
  height: 30px;
  padding: 10px;
  word-break: break-all;
  word-wrap: break-word;
  font-size: 18px;
  font-weight: bold;
  color: #130307;
`

const InputContentStyled = styled.textarea`
  box-shadow: 0 5px 10px #0002;
  border: 1px solid lightgrey;
  border-radius: 3px;
  width: 100%;
  height: 200px;
  padding: 10px;
  word-wrap: break-word;
  font-size: 16px;
  color: #130307;
`

const SelectLabelStyled = styled.label`
  justify-self: left;
  height: auto;
  padding-left: 10px;
  opacity: 0.5;
  font-size: 14px;
  color: #130307;
`

const SelectTagStyled = styled.select`
  display: block;
  appearance: none;
  box-shadow: 0 1px 0 0.5px rgba(0, 0, 0, 0.04);
  border: 1px solid lightgrey;
  border-radius: 7px;
  width: 100%;
  height: 40px;
  padding: 10px;
  line-height: 0.8;
  opacity: 0.5;
  font-size: 16px;
  font-weight: bold;
  color: #130307;
`

const ButtonStyled = styled.button`
  display: inline-block;
  box-shadow: 0 2px 5px #0002;
  border: none;
  height: 30px;
  margin: 0 auto;
  padding: 2px 15px;
  font-weight: bold;
  color: #130307;
  border-radius: ${props => (props.secondary ? '3px' : '50px')};
  width: ${props => (props.secondary ? '100px' : 'auto')};
  background: ${props => (props.secondary ? 'white' : '#17e2cc')};
  font-size: ${props => (props.secondary ? '14px' : '18px')};

  :active {
    box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.1);
  }
`
