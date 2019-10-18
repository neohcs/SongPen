import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

export default function RecorderPlayer(audioURL, clipName, handleDeleteCLick) {
  const [isDisabled, setIsDisabled] = useState(true)

  // const audioCtx = new (window.AudioContext || webkitAudioContext)();
  // const canvasCtx = canvas.getContext("2d"); nur für Visualisierung?
  navigator.mediaDevices.getUserMedia({ audio: true})
  console.log('getUserMedia is supported.')


  // if (navigator.mediaDevices.getUserMedia) {
  //   console.log('getUserMedia is supported.')

    const constraints = { audio: true }
    const chunks = []
    

    function onSuccess(stream) {
      const mediaRecorder = new MediaRecorder(stream)

      // visualize(stream)

      function handleRecordClick() {
        mediaRecorder.start()
        console.log(mediaRecorder.state)
        console.log('recorder started')
        // record.style.background = 'red'
        setIsDisabled(!isDisabled)

        // stop.disabled = false;
        // record.disabled = true; umschreiben in toggle/state?
      }

      function handleStopClick() {
        mediaRecorder.stop()
        console.log(mediaRecorder.state)
        console.log('recorder stopped')
        // record.style.background = ''
        // record.style.color = ''
        // mediaRecorder.requestData(); im Beispiel auskommentiert

        setIsDisabled(!isDisabled)
        // stop.disabled = true;
        // record.disabled = false; s.o.
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

        // function handleLabelClick () {
        //   const existingName = clipLabel.value;
        //   const newClipName = prompt('Enter a new name for your sound clip?');
        //   if (newClipName === null) {
        //     clipLabel.textContent = existingName;
        //   } else {
        //     clipLabel.textContent = newClipName;
        //   }
        // }
      }
      const onError = function(err) {
        console.log('The following error occured: ' + err)
      }

      navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError)
    }

    return (
      <WrapperStyled>
        <MainControlsStyled>
          <VisualizerStyled></VisualizerStyled>
          <ButtonBarStyled>
            <RecordButtonStyled
              disabled={!isDisabled}
            // onClick={handleRecordClick}
            >
              Record
          </RecordButtonStyled>
            <StopButtonStyled
              disabled={isDisabled}
            // onClick={handleStopClick}
            >
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
            <DeleteButtonStyled
            // onClick={handleDeleteClick}
            >
              Delete
          </DeleteButtonStyled>
          </ClipContainerStyled>
        </SoundClipsStyled>
      </WrapperStyled>
    )

  // } else {
  //   console.log('getUserMedia not supported on your browser')
  // }
}
/*
Brauch ich nur zum Visualisieren, ne?
function visualize(stream) {
  var source = audioCtx.createMediaStreamSource(stream)

  var analyser = audioCtx.createAnalyser()
  analyser.fftSize = 2048
  var bufferLength = analyser.frequencyBinCount
  var dataArray = new Uint8Array(bufferLength)

  source.connect(analyser)
  //analyser.connect(audioCtx.destination);

  draw()

  function draw() {
    WIDTH = canvas.width
    HEIGHT = canvas.height

    requestAnimationFrame(draw)

    analyser.getByteTimeDomainData(dataArray)

    canvasCtx.fillStyle = 'rgb(200, 200, 200)'
    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT)

    canvasCtx.lineWidth = 2
    canvasCtx.strokeStyle = 'rgb(0, 0, 0)'

    canvasCtx.beginPath()

    var sliceWidth = (WIDTH * 1.0) / bufferLength
    var x = 0

    for (var i = 0; i < bufferLength; i++) {
      var v = dataArray[i] / 128.0
      var y = (v * HEIGHT) / 2

      if (i === 0) {
        canvasCtx.moveTo(x, y)
      } else {
        canvasCtx.lineTo(x, y)
      }

      x += sliceWidth
    }

    canvasCtx.lineTo(canvas.width, canvas.height / 2)
    canvasCtx.stroke()
  }
}
*/

// window.onresize = function () {
//   canvas.width = mainSection.offsetWidth;
// }

// window.onresize(); brauch ich nicht bei fixer Screengröße, oder?

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
