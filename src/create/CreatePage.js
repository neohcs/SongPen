import React from 'react'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'
import Page from '../common/Page'
import Header from '../common/Header'
import Navigation from '../app/Navigation'
import Date from '../common/Date'
import RecorderPlayer from '../media/RecorderPlayer'

CreatePage.propTypes = {
  onSubmit: PropTypes.func
}

export default function CreatePage({ onSubmit }) {
  function handleSubmit(event) {
    event.preventDefault()
    const form = event.target // hier halte ich fest, wo das Event passiert: auf der form
    const formData = new FormData(form) // hier gebe ich der FormData diese form mit, damit aus ihren Daten Key-Value-Pairs erstellt werden
    const data = Object.fromEntries(formData) // hier werden mit der Object.fromEntries-Methode die Key-Value-Paare in ein Objekt umgewandelt
    onSubmit(data) // hier wird onSubmit aufgerufen und das neue Objekt übergeben. Die Funktion wird der CreatePage in der App mit dem Argument createPage (Funktion) besetzt. Dort wird dann createPage ausgeführt
    //   form.reset() //dies leert die Felder der Form automatisch
    //   form.title.focus() // dies setzt den Fokus automatisch wieder ins Titel-Input-Feld
    // }
  }

  return (
    <Page title={'CreatePage'}>
      <Header></Header>
      <Navigation></Navigation>
      <FormStyled onSubmit={handleSubmit}>
        <Date name="date"></Date>
        <InputTitleStyled
          name="title"
          placeholder={'Insert title here...'}
          maxLength="30"
          required
          autoFocus
        ></InputTitleStyled>
        <InputContentStyled
          name="content"
          placeholder={'Express your creative genius here...'}
        ></InputContentStyled>
        <RecorderPlayer
          name="recording"
          // value={value}
        ></RecorderPlayer>
        {/* <InputRecordStyled
          name="recording"
          placeholder={'Insert URL to your song here...'}
        ></InputRecordStyled> */}
        <div>
          <SelectLabelStyled>
            Please select a tag for your note...
          </SelectLabelStyled>
          <SelectTagStyled name="tag">
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
          Save note
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
  padding: 20px;
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
  height: 250px;
  padding: 10px;
  word-wrap: break-word;
  font-size: 16px;
  color: #130307;
`
// Falls ich doch uploads machen muss:
// const InputRecordStyled = styled.input`
//   box-shadow: 0 5px 10px #0002;
//   border: 1px solid lightgrey;
//   border-radius: 3px;
//   width: 100%;
//   height: 30px;
//   padding: 10px;
//   word-break: break-all;
//   word-wrap: break-word;
//   font-size: 18px;
//   font-weight: bold;
//   color: grey;
// `

const SelectLabelStyled = styled.label`
  justify-self: left;
  height: 15px;
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
  padding: 2px 15px;
  font-weight: bold;
  color: #130307;
  border-radius: ${props => (props.secondary ? '3px' : '20px')};
  width: ${props => (props.secondary ? '100px' : 'auto')};
  background: ${props => (props.secondary ? 'white' : '#17e2cc')};
  font-size: ${props => (props.secondary ? '14px' : '18px')};

  :active {
    box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.1);
  }
`
