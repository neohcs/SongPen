import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { Microphone } from 'styled-icons/typicons'
import { Trash } from 'styled-icons/boxicons-regular'

export default function RecorderPlayer({ title, id }) {
  const [isButtonVisible, setIsButtonVisible] = useState(true)
  const [audioData, setAudioData] = useState([])
  const [mediaRecorder, setMediaRecorder] = useState(null)
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
      // const chunks = [...chunks, event.data]
      console.log('newchunks:', chunks)
    } else {
      alert('No media there.')
    }
  }

  function handleStopClick() {
    setIsButtonVisible(!isButtonVisible)
    mediaRecorder.stop()
    // toggleButton()
    // mediaRecorder.onstop = handleStop
  }

  // function toggleButton() {
  //   // setIsButtonVisible(!isButtonVisible)
  // }

  function handleAudioAfterStop(stream) {
    stream.getTracks().forEach(track => track.stop())
    console.log('data available after MediaRecorder.stop() called.')
    // const clipName = title
    const clipName = prompt('Enter a name for your recording', title)
    console.log(clipName)

    let blob = new Blob(chunks, { type: 'audio/wav; codecs=MS_PCM' })
    console.log('recorder stopped')
    //  console.log(mediaRecorder.state)
    chunks = []
    let blobUrl = URL.createObjectURL(blob)
    console.log(blobUrl)
    // setIsButtonDisabled(!isButtonDisabled)
    setAudioData([{ clipName, blobUrl }, ...audioData])
    console.log(chunks)
    console.log(audioData)
    // vidSave.src = blobUrl -> wie übersetzt sich das für meinen Fall?
  }

  /*
  function handleAudioAfterSubmit() {
    const buffer = []
    function onDataAvailable(event) {
      if (event.data) buffer.push(event.data)
    }

    function bufferToDataUrl(callback) {
      const blob = new Blob(buffer, {
        type: 'audio/wav'
      })

      const reader = new FileReader()
      reader.onload = function() {
        callback(reader.result)
      }
      reader.readAsDataURL(blob)
    }

    // returns file, that we can send to the server.
    function dataUrlToFile(dataUrl) {
      const binary = atob(dataUrl.split(',')[1]),
        data = []

      for (const i = 0; i < binary.length; i++) data.push(binary.charCodeAt(i))

      return new File([new Uint8Array(data)], 'recorded-audio.wav', {
        type: 'audio/wav'
      })
    }

    // triggered by user.
    function onStopButtonClick() {
      try {
        recorder.stop()
        recorder.stream.getTracks().forEach(function(track) {
          track.stop()
        })
      } catch (event) {}

      bufferToDataUrl(function(dataUrl) {
        const file = dataUrlToFile(dataUrl)
        console.log(file)
        // upload file to the server. -> muss ich das hinzufügen?
      })
    }
  }
  // von https://60devs.com/recording-videos-in-the-browser-using-media-recorder-api.html
  */

  function handleDeleteClick(event) {
    const evtTgt = event.target
    evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode)
  }

  // function handleRecordChange() {
  //   console.log('ähm')
  // }

  return (
    <MediaWrapperStyled>
      <MainControlsStyled>
        {/* <VisualizerStyled></VisualizerStyled> */}
        <ButtonBarStyled>
          <MicrophoneStyled
            // visible
            visible={isButtonVisible}
            // disabled={!isButtonDisabled}
            onClick={handleRecordClick}
          ></MicrophoneStyled>
          <ButtonStyled
            // visible
            visible={!isButtonVisible}
            // disabled={isButtonDisabled}
            onClick={handleStopClick}
          >
            Stop
          </ButtonStyled>
        </ButtonBarStyled>
      </MainControlsStyled>
      <SoundClipsStyled
      // onChange={handleRecordChange}
      >
        {audioData.map(blob => (
          <ClipContainerStyled
            key={blob.index}
            // value={blob.clipName + blob.index + id}
          >
                  
            <AudioStyled src={blob.blobUrl} controls></AudioStyled>
            {/* <ClipLabelStyled
            // onClick={handleLabelClick}
            >
                       {blob.clipName}                 
            </ClipLabelStyled> */}
            <DeleteAudioStyled
              visible
              secondary
              onClick={handleDeleteClick}
            ></DeleteAudioStyled>
             
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

// const VisualizerStyled = styled.canvas`
//   display: block;
//   margin-bottom: 0.5rem;
//   height: 60px;
// `

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

const ClipLabelStyled = styled.p`
  display: inline-block;
  font-size: 14px;
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
  /* margin: 10px auto; */
  width: 30px;
  height: 30px;
  color: grey;
`
