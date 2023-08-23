import React, { useEffect, useRef, useState } from 'react'
import Peer from 'peerjs'
import { useNavigate, useParams } from 'react-router-dom'
import useSpeechToText from 'react-hook-speech-to-text'

export const VideoChat = () => {
  const { error, interimResult, isRecording, results, startSpeechToText, stopSpeechToText } = useSpeechToText({
    continuous: true,
    crossBrowser: true,
    googleCloudRecognitionConfig: {
      languageCode: 'tr-TR'
    },
    googleApiKey: 'AIzaSyCKkxJ4z3bmDbP8tR0TFf-8_LDjZUChmeI',
    useLegacyResults: false
  })

  if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>

  return (
    <div>
      <h1>Recording: {isRecording.toString()}</h1>
      <button onClick={isRecording ? stopSpeechToText : startSpeechToText}>{isRecording ? 'Stop Recording' : 'Start Recording'}</button>
      <ul>
        {results.map((result: any) => (
          <li>{result.transcript}</li>
        ))}
        {interimResult && <li>{interimResult}</li>}
      </ul>
    </div>
  )
}
