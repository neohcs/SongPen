import React, { useState } from 'react'
import styled from 'styled-components/macro'

export default function RecorderPlayer(audioURL, clipName, handleDeleteCLick) {
  const [isDisabled, setIsDisabled] = useState(true)

  const chunks = []
  const mediaRecorder = new MediaRecorder(stream)

  async function handleRecordClick() {
    const stream = await getMedia({ audio: true })
    return record(stream)
  }

  function getMedia(constraints) {
    try {
      return navigator.mediaDevices.getUserMedia(constraints)
    } catch (err) {
      alert('Fail')
    }
  }

  function record(stream) {
    mediaRecorder.start()
    console.log(mediaRecorder.state)
    console.log('recorder started')
    setIsDisabled(!isDisabled)
  }

  function handleStopClick() {
    mediaRecorder.stop()
    console.log(mediaRecorder.state)
    console.log('recorder stopped')
    setIsDisabled(!isDisabled)
  }

  function onError(err) {
    console.log('The following error occured: ' + err)
  }

  function handleDeleteClick(event) {
    const evtTgt = event.target
    evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode)
  }

  mediaRecorder.ondataavailable = function(event) {
    chunks.push(event.data)
  }

  mediaRecorder.onStop = function() {
    console.log('data available after MediaRecorder.stop() called.')

    const clipName = prompt(
      'Enter a name for your recording',
      'Unnamed recording'
    )
    console.log(clipName)

    const blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' })
    chunks = []
    const audioURL = window.URL.createObjectURL(blob)
    console.log('recorder stopped')
  }

  return (
    <WrapperStyled>
      <MainControlsStyled>
        <VisualizerStyled></VisualizerStyled>
        <ButtonBarStyled>
          <RecordButtonStyled
            disabled={!isDisabled}
            onClick={handleRecordClick}
          >
            Record
          </RecordButtonStyled>
          <StopButtonStyled disabled={isDisabled} onClick={handleStopClick}>
            Stop
          </StopButtonStyled>
        </ButtonBarStyled>
      </MainControlsStyled>
      <SoundClipsStyled>
        <ClipContainerStyled>
          <AudioStyled src={audioURL} controls=""></AudioStyled>
          {/* {clipName === null ? (
            <ClipLabelStyled
            // onClick={handleLabelClick}
            >
              'My unnamed clip'
            </ClipLabelStyled>
          ) : (
            <ClipLabelStyled
            // onClick={handleLabelClick}
            >
              {clipName}
            </ClipLabelStyled>
          )} */}
          <DeleteButtonStyled onClick={handleDeleteClick}>
            Delete
          </DeleteButtonStyled>
        </ClipContainerStyled>
      </SoundClipsStyled>
    </WrapperStyled>
  )
}

const WrapperStyled = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

const MainControlsStyled = styled.section`
  display: block;
  padding: 0.5rem 0;
`

const VisualizerStyled = styled.canvas`
  display: block;
  margin-bottom: 0.5rem;
  height: 60px;
`

const ButtonBarStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const RecordButtonStyled = styled.button`
  transition: all 0.2s;
  text-align: center;
  width: calc(50% - 0.25rem);
  border: none;
  padding: 0.5rem;
  background: #0088cc;
  font-size: 1rem;
  color: white;

  :hover,
  :focus {
    box-shadow: inset 0px 0px 10px rgba(255, 255, 255, 1);
    background: #0ae;
  }

  :active {
    box-shadow: inset 0px 0px 20px rgba(0, 0, 0, 0.5);
    transform: translateY(2px);
  }
`

const StopButtonStyled = styled.button`
  transition: all 0.2s;
  text-align: center;
  width: calc(50% - 0.25rem);
  border: none;
  padding: 0.5rem;
  background: #0088cc;
  font-size: 1rem;
  color: white;

  :hover,
  :focus {
    box-shadow: inset 0px 0px 10px rgba(255, 255, 255, 1);
    background: #0ae;
  }

  :active {
    box-shadow: inset 0px 0px 20px rgba(0, 0, 0, 0.5);
    transform: translateY(2px);
  }
`

const SoundClipsStyled = styled.section`
  display: block;
  flex: 1;
  overflow: auto;
`

const ClipContainerStyled = styled.article`
  padding-bottom: 1rem;
`

const AudioStyled = styled.audio`
  width: 100%;
  display: block;
  margin: 1rem auto 0.5rem;
`

const ClipLabelStyled = styled.p`
  display: inline-block;
  font-size: 1rem;
  cursor: pointer;
`

const DeleteButtonStyled = styled.button`
  float: right;
  padding: 0.5rem 0.75rem;
  background: #f00;
  font-size: 0.8rem;
`
