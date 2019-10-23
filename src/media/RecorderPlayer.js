import React, { useState, useEffect } from 'react'
import styled from 'styled-components/macro'
import { Microphone } from 'styled-icons/typicons'
import { Trash, Download } from 'styled-icons/boxicons-regular'

export default function RecorderPlayer({ recordingsState }) {
  const [isButtonVisible, setIsButtonVisible] = useState(true)
  const [mediaRecorder, setMediaRecorder] = useState(null)
  const [recordings, setRecordings] = recordingsState
  let chunks = []

  async function handleRecordClick() {
    console.log('Recording clicked')
    const stream = await getMedia({ audio: true })
    console.log('Received stream: ', stream)
    return record(stream)
  }

  function getMedia(constraints) {
    try {
      const stream = navigator.mediaDevices.getUserMedia(constraints)
      return stream
    } catch (err) {
      alert('Fail')
    }
  }

  function record(stream) {
    const mediaRecorder = new MediaRecorder(stream)
    mediaRecorder.ondataavailable = handleDataAvailable
    mediaRecorder.onstop = () => handleAudioAfterStop(stream)
    mediaRecorder.start()
    console.log('recorder started')
    console.log(mediaRecorder.state)
    setIsButtonVisible(!isButtonVisible)
    setMediaRecorder(mediaRecorder)
  }

  function handleDataAvailable(event) {
    if (event.data.size > 0) {
      console.log(event.data)
      chunks.push(event.data)
    } else {
      alert('No media there.')
    }
  }

  function handleStopClick() {
    setIsButtonVisible(!isButtonVisible)
    mediaRecorder.stop()
  }

  function handleAudioAfterStop(stream) {
    stream.getTracks().forEach(track => track.stop())
    console.log('data available after MediaRecorder.stop() called.')

    chunks = []

    let blob = new Blob(chunks, { type: 'audio/wav; codecs=MS_PCM' })
    console.log('recorder stopped')

    const data = new FormData()
    data.append('file', blob)

    fetch('/notes/upload/', {
      method: 'POST',
      body: data
    })
      .then(res => res.json())
      .then(file => setRecordings([...recordings, file.path]))
      .catch(err => console.log('ERROR', err))
  }

  function handleDeleteClick(index) {
    setRecordings([
      ...recordings.slice(0, index),
      ...recordings.slice(index + 1)
    ])
  }

  return (
    <MediaWrapperStyled>
      <MainControlsStyled>
        <ButtonBarStyled>
          <MicrophoneStyled
            visible={isButtonVisible}
            onClick={handleRecordClick}
          ></MicrophoneStyled>
          <ButtonStyled
            visible={!isButtonVisible}
            onClick={handleStopClick}
            type="button"
          >
            Stop
          </ButtonStyled>
        </ButtonBarStyled>
      </MainControlsStyled>
      <SoundClipsStyled>
        {recordings &&
          recordings.map((recording, index) => (
            <ClipContainerStyled key={recording}>
              <AudioStyled src={recording} controls></AudioStyled>
              <DeleteAudioStyled
                visible
                onClick={event => handleDeleteClick(event, index)}
              ></DeleteAudioStyled>
              <a href={recording}>
                <DownloadAudioStyled />
              </a>
            </ClipContainerStyled>
          ))}
      </SoundClipsStyled>
    </MediaWrapperStyled>
  )
}

const MediaWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const MainControlsStyled = styled.section`
  display: block;
  /* padding: 0.5rem 0; */
`

const ButtonBarStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 50px;
`

const SoundClipsStyled = styled.section`
  /* display: ${props => (props.visible ? 'block' : 'none')}; */
  /* flex: 1; */
  /* display: flex; */
  /* justify-content: space-between; */
  /* gap: 20px; */
  /* justify-items: left; */
  overflow-x: hidden;
  overflow-y: auto;
  scroll-behavior: smooth;
  max-width: 90vw;
  padding: 5px 20px;
`

const ClipContainerStyled = styled.article`
  /* overflow-x: hidden;
  overflow-y: auto;
  scroll-behavior: smooth;
  max-width: 100%;
  padding: 5px 20px; */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  /* justify-content: space-between; */
  /* align-items: center; */
  gap: 10px;
  margin: 0;
  padding: 10px;
  width: 100%;
`

const AudioStyled = styled.audio`
  display: inline-block;
  align-self: left;
  /* margin: 10px auto; */
  width: auto;
`

const ButtonStyled = styled.button`
  display: ${props => (props.visible ? 'inline-block' : 'none')};
  box-shadow: 0 2px 5px #0002;
  border: none;
  height: 30px;
  padding: 2px 15px;
  font-weight: bold;
  border-radius: ${props => (props.secondary ? '3px' : '20px')};
  width: ${props => (props.secondary ? '100px' : 'auto')};
  background: ${props => (props.secondary ? 'white' : '#17e2cc')};
  font-size: ${props => (props.secondary ? '14px' : '18px')};
  color: ${props => (props.secondary ? '#130307' : '#130307')};

  :hover,
  :focus {
    /* box-shadow: inset 0px 0px 10px rgba(255, 255, 255, 1); */
    box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.1);
    /* background: #0ae; */
  }

  :active {
    box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.1);
    transform: translateY(2px);
  }
`
const MicrophoneStyled = styled(Microphone)`
  display: ${props => (props.visible ? 'inline-block' : 'none')};
  border: 5px solid #17e2cc;
  height: 50px;
  background: #17e2cc;
  border-radius: 50%;
  color: #130307;
`

const DeleteAudioStyled = styled(Trash)`
  display: inline-block;
  width: 30px;
  height: 30px;
  color: grey;
`
const DownloadAudioStyled = styled(Download)`
  display: inline-block;
  width: 30px;
  height: 30px;
  color: grey;
`
