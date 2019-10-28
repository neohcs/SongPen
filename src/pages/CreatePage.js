import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import { Redirect } from 'react-router-dom'
import Page from '../common/Page'
import Header from '../common/Header'
import Date from '../common/Date'
import RecorderPlayer from '../media/RecorderPlayer'

CreatePage.propTypes = {
  onSubmit: PropTypes.func
}

export default function CreatePage({ onSubmit }) {
  const [recordings, setRecordings] = useState([])
  const [shouldRedirect, setShouldRedirect] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    const form = event.target
    const formData = new FormData(form)
    let data = Object.fromEntries(formData)
    data = {
      ...data,
      recordings
    }
    setShouldRedirect(true)
    onSubmit(data)
  }

  function renderSelectOptions() {
    return (
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
    )
  }

  return (
    <>
      {shouldRedirect && <Redirect to="/" />}
      <Page title={'CreatePage'}>
        <Header />
        <FormStyled onSubmit={handleSubmit}>
          <Date name="date"></Date>
          <InputTitleStyled
            required
            name="title"
            placeholder={'Insert title here...'}
            maxLength="30"
          ></InputTitleStyled>
          <InputContentStyled
            name="content"
            placeholder={'Express your creative genius here...'}
          ></InputContentStyled>
          <RecorderPlayer
            name="recordings"
            recordingsState={[recordings, setRecordings]}
          ></RecorderPlayer>
          <div>
            <SelectLabelStyled>
              Please select a tag for your note...
            </SelectLabelStyled>
            {renderSelectOptions()}
          </div>
          <ButtonStyled>Save note</ButtonStyled>
          <ButtonStyled
            type="button"
            secondary
            onClick={() => {
              setShouldRedirect(true)
            }}
          >
            Cancel
          </ButtonStyled>
        </FormStyled>
      </Page>
    </>
  )
}

const FormStyled = styled.form`
  display: grid;
  gap: 20px;
  justify-items: center;
  overflow-y: auto;
  scroll-behavior: smooth;
  margin: 20px 0;
  padding: 0 20px 20px;
`

const InputTitleStyled = styled.input`
  box-shadow: 0 5px 10px #0032;
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
  box-shadow: 0 5px 10px #0032;
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
  box-shadow: 0 2px 5px #0032;
  border: none;
  border-radius: ${props => (props.secondary ? '3px' : '50px')};
  width: ${props => (props.secondary ? '100px' : 'auto')};
  height: 40px;
  padding: 0 30px;
  background: ${props => (props.secondary ? 'white' : '#17e2cc')};
  font-size: ${props => (props.secondary ? '14px' : '22px')};
  font-weight: bold;
  color: #130307;

  :active {
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1);
  }
`
