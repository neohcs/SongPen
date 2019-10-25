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
  const [isMicPulsing, setIsMicPulsing] = useState(false)
  const [mediaRecorder, setMediaRecorder] = useState(null)
  const [recordings, setRecordings] = recordingsState
  let chunks = []

  async function handleRecordClick() {
    console.log(recordingsState)
    const stream = await getMedia({ audio: true })
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
    console.log(mediaRecorder.state)
    setIsButtonVisible(!isButtonVisible)
    setIsMicPulsing(!isMicPulsing)
    setMediaRecorder(mediaRecorder)
  }

  function handleDataAvailable(event) {
    if (event.data.size) {
      console.log(event.data)
      chunks.push(event.data)
    } else {
      alert('No media there.')
    }
  }

  function handleStopClick() {
    setIsButtonVisible(!isButtonVisible)
    setIsMicPulsing(!isMicPulsing)
    mediaRecorder.stop()
  }

  function handleAudioAfterStop(stream) {
    stream.getTracks().forEach(track => track.stop())
    console.log('data available after MediaRecorder.stop() called.')

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

  function handleDeleteClick(event, index) {
    setRecordings([
      ...recordings.slice(0, index),
      ...recordings.slice(index + 1)
    ])
  }

  return (
    <MediaWrapperStyled>
      <MainControlsStyled>
        <ButtonBarStyled>
          <ButtonStyled
            onClick={handleRecordClick}
            visible={isButtonVisible}
            type="button"
          >
            Record
          </ButtonStyled>
          <MicrophoneStyled pulsing={isMicPulsing}></MicrophoneStyled>
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
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  height: 60px;
`

const MicrophoneStyled = styled(Microphone)`
  display: inline-block;
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 1);
  border-radius: 50%;
  height: 40px;
  color: white;
  /* color: #130307; */
  border: ${props => (props.pulsing ? '5px solid red' : '5px solid grey')};
  background: ${props => (props.pulsing ? 'red' : 'grey')};
  transform: ${props => (props.pulsing ? 'scale(1)' : 'none')};
  animation: ${props => (props.pulsing ? 'pulse-red 2s infinite' : 'none')};
  @keyframes pulse-red {
    0% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(255, 82, 82, 0.7);
    }

    70% {
      transform: scale(1);
      box-shadow: 0 0 0 10px rgba(255, 82, 82, 0);
    }

    100% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(255, 82, 82, 0);
    }
  }
`

const ButtonStyled = styled.button`
  visibility: ${props => (props.visible ? 'visible' : 'hidden')};
  display: inline-block;
  box-shadow: 0 2px 5px #0032;
  border: none;
  border-radius: 20px;
  width: auto;
  height: 30px;
  padding: 2px 15px;
  background: #f0f3f5;
  font-size: 16px;
  font-weight: bold;
  color: #130307;

  :focus {
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1);
  }

  :active {
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1);
    transform: translateY(2px);
  }

  :disabled {
    color: #130307;
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
