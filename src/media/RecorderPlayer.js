import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { MicrophoneAlt } from 'styled-icons/fa-regular'

export default function RecorderPlayer({ title, id }) {
  // const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  // const [isButtonVisible, setIsButtonVisible] = useState(true)
  const [audioData, setAudioData] = useState([])
  // const [clickCount, setClickCount] = useState(0)
  let chunks = []
  let mediaRecorder

  async function handleRecordClick() {
    // setClickCount(clickCount + 1)
    // clickCount > 1 ||
    // toggleButton()
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
    mediaRecorder = new MediaRecorder(stream)
    mediaRecorder.ondataavailable = handleDataAvailable
    mediaRecorder.onstop = () => handleAudioAfterStop(stream)
    mediaRecorder.start()
    console.log('recorder started')
    console.log(mediaRecorder.state)
    // setIsButtonDisabled(!isButtonDisabled)
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
    // setIsButtonVisible(!isButtonVisible)
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

    const blob = new Blob(chunks, { type: 'audio/wav; codecs=MS_PCM' })
    console.log('recorder stopped')
    console.log(mediaRecorder.state)
    const blobUrl = URL.createObjectURL(blob)
    // setIsButtonDisabled(!isButtonDisabled)
    chunks = []
    setAudioData([{ clipName, blobUrl }, ...audioData])
    console.log(chunks)
    console.log(audioData)
  }

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
          <ButtonStyled
            visible
            // visible={isButtonVisible}
            // disabled={!isButtonDisabled}
            onClick={handleRecordClick}
          >
            Record
          </ButtonStyled>
          <ButtonStyled
            visible
            // visible={!isButtonVisible}
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
            <ClipLabelStyled
            // onClick={handleLabelClick}
            >
                       {blob.clipName}                 
            </ClipLabelStyled>
            <ButtonStyled visible secondary onClick={handleDeleteClick}>
                          Delete           
            </ButtonStyled>
             
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
`

// const VisualizerStyled = styled.canvas`
//   display: block;
//   margin-bottom: 0.5rem;
//   height: 60px;
// `

const ButtonBarStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

// const RecordButtonStyled = styled.button`
//   transition: all 0.2s;
//   text-align: center;
//   width: calc(50% - 0.25rem);
//   border: none;
//   padding: 0.5rem;
//   background: #0088cc;
//   font-size: 1rem;
//   color: white;

//   :hover,
//   :focus {
//     box-shadow: inset 0px 0px 10px rgba(255, 255, 255, 1);
//     background: #0ae;
//   }

//   :active {
//     box-shadow: inset 0px 0px 20px rgba(0, 0, 0, 0.5);
//     transform: translateY(2px);
//   }
// `

// const StopButtonStyled = styled.button`
//   transition: all 0.2s;
//   text-align: center;
//   width: calc(50% - 0.25rem);
//   border: none;
//   padding: 0.5rem;
//   background: #0088cc;
//   font-size: 1rem;
//   color: white;

//   :hover,
//   :focus {
//     box-shadow: inset 0px 0px 10px rgba(255, 255, 255, 1);
//     background: #0ae;
//   }

//   :active {
//     box-shadow: inset 0px 0px 20px rgba(0, 0, 0, 0.5);
//     transform: translateY(2px);
//   }
// `

const SoundClipsStyled = styled.section`
  display: ${props => (props.visible ? 'block' : 'none')};
  flex: 1;
  /* display: flex; */
  /* justify-content: space-between; */
  /* gap: 20px; */
  /* justify-items: left; */
  overflow-x: hidden;
  overflow-y: auto;
  scroll-behavior: smooth;
  max-width: 100%;
  /* padding: 5px 20px; */
`

const ClipContainerStyled = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0;
  width: 100%;
  /* padding-bottom: 1rem; */
`

const AudioStyled = styled.audio`
  display: block;
  margin: 1rem auto 0.5rem;
  width: 100%;
`

const ClipLabelStyled = styled.p`
  display: inline-block;
  font-size: 14px;
`

// const DeleteButtonStyled = styled.button`
//   float: right;
//   padding: 0.5rem 0.75rem;
//   background: #f00;
//   font-size: 0.8rem;
// `

const ButtonStyled = styled.button`
  display: inline-block;
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
// const MicrophoneStyled = styled(MicrophoneAlt)`
//   height: 50px;
//   color: #17e2cc;
// `
