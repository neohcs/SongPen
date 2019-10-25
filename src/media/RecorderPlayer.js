import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import { Microphone } from 'styled-icons/typicons'
import { Trash, Download } from 'styled-icons/boxicons-regular'

RecorderPlayer.propTypes = {
  recordingsState: PropTypes.array
}

export default function RecorderPlayer({ recordingsState }) {
  const [isButtonVisible, setIsButtonVisible] = useState(true)
  const [mediaRecorder, setMediaRecorder] = useState(null)
  const [recordings, setRecordings] = recordingsState
  let chunks = []

  async function handleRecordClick() {
    console.log('Recording clicked')
    console.log(recordingsState)
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

    // chunks = []

    let blob = new Blob(chunks, { type: 'audio/wav; codecs=MS_PCM' })
    console.log('recorder stopped')

    const data = new FormData()
    data.append('file', blob)
    console.log(data)

    fetch('/notes/upload/', {
      method: 'POST',
      body: data
    })
      .then(res => res.json())
      .then(file => setRecordings([...recordings, file.path]))
      .catch(err => console.log('ERROR', err))
  }

  function handleDeleteClick(event, index) {
    console.log(index)
    console.log('Recording before ', recordings)
    setRecordings([
      ...recordings.slice(0, index),
      ...recordings.slice(index + 1)
    ])
    console.log('Recording before ', recordings)
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
              <div>
                <DeleteAudioStyled
                  visible
                  onClick={event => handleDeleteClick(event, index)}
                ></DeleteAudioStyled>
                <a href={recording}>
                  <DownloadAudioStyled />
                </a>
              </div>
            </ClipContainerStyled>
          ))}
      </SoundClipsStyled>
    </MediaWrapperStyled>
  )
}

const MediaWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 95%;
`

const MainControlsStyled = styled.section`
  display: block;
`

const ButtonBarStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 50px;
`

const MicrophoneStyled = styled(Microphone)`
  display: ${props => (props.visible ? 'inline-block' : 'none')};
  border: 5px solid #17e2cc;
  border-radius: 50%;
  height: 50px;
  background: #17e2cc;
  color: #130307;
`

const ButtonStyled = styled.button`
  display: ${props => (props.visible ? 'inline-block' : 'none')};
  box-shadow: 0 2px 5px #0032;
  border: none;
  border-radius: 20px;
  width: auto;
  height: 30px;
  padding: 2px 15px;
  background: #17e2cc;
  font-size: 18px;
  font-weight: bold;
  color: #130307;

  :focus {
    box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.1);
  }

  :active {
    box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.1);
    transform: translateY(2px);
  }
`

const SoundClipsStyled = styled.section`
  overflow-x: hidden;
  overflow-y: auto;
  scroll-behavior: smooth;
  max-width: 95%;
`

const ClipContainerStyled = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  margin-bottom: 5px;
  padding: 10px;
`

const AudioStyled = styled.audio`
  display: block;
`

const DeleteAudioStyled = styled(Trash)`
  display: inline-block;
  width: 20px;
  height: 20px;
  color: grey;
`
const DownloadAudioStyled = styled(Download)`
  display: inline-block;
  width: 20px;
  height: 20px;
  color: grey;
`
