import React, { useState } from 'react'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'
import Page from '../common/Page'
import Header from '../common/Header'
import Navigation from '../app/Navigation'
import RecorderPlayer from '../media/RecorderPlayer'

EditPage.propTypes = {
  onSubmit: PropTypes.func
}

export default function EditPage({ onSubmit, editNoteData }) {
  const [title, setTitle] = useState(editNoteData.title)
  const [content, setContent] = useState(editNoteData.content.toString())
  const [label, setLabel] = useState(editNoteData.label)
  const [recording, setRecording] = useState([editNoteData.recording])
  const [date, setDate] = useState(editNoteData.date)

  function handleSubmit(event) {
    event.preventDefault()
    updateDate()
    const form = event.target // hier halte ich fest, wo das Event passiert: auf der form
    const formData = new FormData(form) // hier gebe ich der FormData diese form mit, damit aus ihren Daten Key-Value-Pairs erstellt werden
    let data = Object.fromEntries(formData) // hier werden mit der Object.fromEntries-Methode die Key-Value-Paare in ein Objekt umgewandelt
    data = { ...data, date }
    onSubmit(editNoteData._id, data) // hier wird onSubmit aufgerufen und das neue Objekt übergeben. Die Funktion wird der CreatePage in der App mit dem Argument createPage (Funktion) besetzt. Dort wird dann createPage ausgeführt
  }

  function updateDate() {
    const currentDay = new Date().getDate()
    const currentMonth = new Date().getMonth() + 1
    const currentYear = new Date().getFullYear()
    const currentHours = new Date().getHours()
    const currentMinutes = new Date().getMinutes()
    const currentDate =
      currentDay +
      '/' +
      currentMonth +
      '/' +
      currentYear +
      ' ' +
      currentHours +
      ':' +
      currentMinutes
    return setDate(currentDate)
  }

  return (
    <Page title={'EditPage'}>
      <Header></Header>
      <Navigation></Navigation>
      <FormStyled onSubmit={handleSubmit}>
        <InputDateStyled name="date" value={date}></InputDateStyled>
        <InputTitleStyled
          name="title"
          value={title}
          onChange={event => setTitle(event.target.value)}
          maxLength="20"
          required
          autoFocus
        ></InputTitleStyled>
        <InputContentStyled
          name="content"
          value={content}
          onChange={event => setContent(event.target.value)}
        ></InputContentStyled>
        <RecorderPlayer></RecorderPlayer>
        <InputRecordStyled
          name="recording"
          value={recording}
          onChange={event =>
            setRecording([editNoteData.recording, event.target.value])
          }
        ></InputRecordStyled>
        <SelectLabelStyled>
          Please select a tag for your note...
        </SelectLabelStyled>
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
        <ButtonStyled
          onClick={() => {
            window.location = 'http://localhost:3000/'
          }}
        >
          Save changes
        </ButtonStyled>
      </FormStyled>
      <ButtonStyled
        secondary
        onClick={() => {
          window.location = 'http://localhost:3000/'
        }}
      >
        Cancel
      </ButtonStyled>
    </Page>
  )
}

const FormStyled = styled.form`
  display: grid;
  gap: 20px;
  justify-items: center;
  overflow-y: auto;
  scroll-behavior: smooth;
  padding: 20px;
`

const InputDateStyled = styled.input`
  border: 1px solid lightgrey;
  border-radius: 3px;
  width: 125px;
  height: 20px;
  padding: 10px;
  color: lightgrey;
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
  color: grey;
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
  color: grey;
`

const InputRecordStyled = styled.input`
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
  color: grey;
`

const SelectLabelStyled = styled.label`
  justify-self: left;
  opacity: 0.7;
  height: auto;
  padding-left: 10px;
  font-size: 14px;
  color: grey;
`

const SelectTagStyled = styled.select`
  display: block;
  opacity: 0.7;
  appearance: none;
  box-shadow: 0 1px 0 0.5px rgba(0, 0, 0, 0.04);
  border: 1px solid lightgrey;
  border-radius: 7px;
  width: 100%;
  line-height: 0.8;
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  color: grey;
`

const ButtonStyled = styled.button`
  display: inline-block;
  box-shadow: 0 2px 5px #0002;
  border: none;
  border-radius: 7px;
  height: 30px;
  margin: 0 auto;
  padding: 2px 15px;
  font-weight: bold;
  width: ${props => (props.secondary ? '100px' : 'auto')};
  background: ${props => (props.secondary ? 'white' : '#ecf7f8')};
  font-size: ${props => (props.secondary ? '14px' : '18px')};
  color: ${props => (props.secondary ? 'grey' : '#54abbc')};
`
