import ReactPlayer from 'react-player'
import { messageRequest, textToSpeech } from '../utils'
import useSpeechToText from 'react-hook-speech-to-text'
import { InComingBuble, IsWriting, OutGoingBuble } from '../components/VoiceAsistant'
import React, { ReactNode, createContext, useCallback, useMemo, useState } from 'react'

import { withLogger, withLoggerAsync } from '../log'

interface ChatContextType {
  temp: boolean
  OutGoingMessage: string
  Room: string
  History: string
  Audio: any
  Speech2Text: any
  MessageArray: any[]
  Theme: {
    text_color: string
    buble_background: string
    background: string
    navbar_background: string
    svg_image: string
  }
  InComingMessage: string
  setOutGoingMessage: React.Dispatch<React.SetStateAction<string>>
  setTheme: React.Dispatch<
    React.SetStateAction<{
      text_color: string
      buble_background: string
      background: string
      navbar_background: string
      svg_image: string
    }>
  >
  setHistory: React.Dispatch<React.SetStateAction<string>>
  setRoom: React.Dispatch<React.SetStateAction<string>>
  setMessageArray: React.Dispatch<React.SetStateAction<any[]>>
  setAudio: React.Dispatch<React.SetStateAction<any>>
  setInComingMessage: React.Dispatch<React.SetStateAction<string>>
  setTemp: React.Dispatch<React.SetStateAction<boolean>>
  MessageRequest: () => void
  AddOutGoing: () => void
  AddInComing: (message: string) => void
  SetMessage: (_results: any[]) => void
}

interface ChatProviderProps {
  children: ReactNode
}

export const ChatContext = createContext<ChatContextType>({
  temp: false,
  MessageArray: [],
  Theme: {
    text_color: 'text-black]',
    buble_background: 'bg-[#EAEAEA]',
    background: 'bg-white',
    navbar_background: 'bg-[#EAEAEA]-500/50',
    svg_image: 'light'
  },
  OutGoingMessage: '',
  History: '',
  Room: '',
  Audio: null,
  InComingMessage: '',
  setOutGoingMessage: withLogger(() => {}, 'setOutGoingMessage'),
  setMessageArray: withLogger(() => {}, 'setMessageArray'),
  setTheme: withLogger(() => {}, 'setTheme'),
  setAudio: withLogger(() => {}, 'setAudio'),
  setInComingMessage: withLogger(() => {}, 'setInComingMessage'),
  AddOutGoing: withLogger(() => {}, 'AddOutGoing'),
  setRoom: withLogger(() => {}, 'setRoom'),
  AddInComing: withLogger(() => {}, 'AddInComing'),
  setHistory: withLogger(() => {}, 'setHistory'),
  setTemp: withLogger(() => {}, 'setTemp'),
  MessageRequest: withLogger(() => {}, 'MessageRequest'),
  Speech2Text: withLogger(() => {}, 'Speech2Text'),
  SetMessage: withLogger(() => {}, 'SetMessage')
})

export const ChatContextProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [Room, setRoom] = useState<string>('')
  const [temp, setTemp] = useState<boolean>(false)
  const [History, setHistory] = useState<string>('')
  const [Audio, setAudio] = useState<any>()
  const [MessageArray, setMessageArray] = useState<any[]>([])
  const [OutGoingMessage, setOutGoingMessage] = useState<string>('')
  const [InComingMessage, setInComingMessage] = useState<string>('')
  const [Theme, setTheme] = useState<{
    text_color: string
    buble_background: string
    background: string
    navbar_background: string
    svg_image: string
  }>({
    text_color: 'text-black',
    buble_background: 'bg-[#EAEAEA]/90',
    background: 'bg-white',
    navbar_background: 'bg-[#EAEAEA]',
    svg_image: 'light'
  })

  // Speech to text libary
  const Speech2Text = useSpeechToText({
    continuous: true,
    crossBrowser: true,
    googleCloudRecognitionConfig: {
      languageCode: 'tr-TR'
    },
    googleApiKey: 'AIzaSyCKkxJ4z3bmDbP8tR0TFf-8_LDjZUChmeI',
    useLegacyResults: false,
    timeout: 1000000
    // useOnlyGoogleCloud: true
  })

  // Mesaj baloncukları için uniq key

  const getCurrentTimestampLog = () => {
    return Math.floor(Date.now() / 1000) // Şu anki zaman damgasını saniye cinsinden alır
  }

  const getCurrentTimestamp = withLogger(getCurrentTimestampLog, 'getCurrentTimestamp')

  // Add OutGoing Chat Html Element
  const AddOutGoingLog = () => {
    if (OutGoingMessage.length === 0) return
    Speech2Text.stopSpeechToText()
    let temp = OutGoingMessage.charAt(0).toUpperCase() + OutGoingMessage.slice(1)
    MessageArray.push(<OutGoingBuble key={getCurrentTimestamp()} message={temp} />)
    setMessageArray(MessageArray)
    setOutGoingMessage('')
    MessageRequest()
  }

  const AddOutGoing = withLogger(AddOutGoingLog, 'AddOutGoing')

  // Buffer to Audio
  const SoundPlayerLog = (soundData: any) => {
    const bufferToArrayBuffer = (buffer: number[]): ArrayBuffer => {
      return new Uint8Array(buffer).buffer
    }
    const arrayBufferToUrl = (buffer: ArrayBuffer): string => {
      const blob = new Blob([buffer], { type: 'audio/wav' })
      return URL.createObjectURL(blob)
    }
    return arrayBufferToUrl(bufferToArrayBuffer(soundData))
  }

  const SoundPlayer = withLogger(SoundPlayerLog, 'SoundPlayer')

  // Text to speech Api
  const TextToSpeechLog = async (message: string) => {
    let temp = await textToSpeech(message)
    if (!temp) return
    console.log(temp)
    let soundUrl = SoundPlayer(temp.result.data)
    setAudio(<ReactPlayer className="hidden" url={soundUrl} controls playing />)
  }

  const TextToSpeech = withLoggerAsync(TextToSpeechLog, 'TextToSpeech')

  // New request for GPT
  const MessageRequestLog = async () => {
    if (!(OutGoingMessage.length > 0) || !Speech2Text.isRecording) return
    let temp = await messageRequest(OutGoingMessage, History)
    TextToSpeech(temp.message.content)
    console.log(temp.message)
    setInComingMessage(temp.message.content)
    setHistory(temp.historyId)
  }

  const MessageRequest = withLoggerAsync(MessageRequestLog, 'MessageRequest')

  // Add İnComing Chat Html Element
  const AddInComingLog = (message: string) => {
    if (message.length === 0) return
    Speech2Text.startSpeechToText()
    let temp = message
    MessageArray.push(<InComingBuble key={getCurrentTimestamp()} message={temp} />)
    setMessageArray(MessageArray)
    // TextToSpeech(temp)
    setInComingMessage('')
    // ReadOut(InComingMessage)
  }

  const AddInComing = withLogger(AddInComingLog, 'AddInComing')

  // Ui komutları
  const SetCommandLog = (temp: string) => {
    if (temp === 'karanlık temaya geç' || temp === 'karanlık demeye geç') {
      setTheme({
        text_color: 'text-white',
        buble_background: 'bg-[#333333]/90',
        background: 'bg-black',
        navbar_background: 'bg-[#333333]/50',
        svg_image: 'dark'
      })
    } else if (temp === 'aydınlık temaya geç' || temp === 'aydınlık demeye geç') {
      setTheme({
        text_color: 'text-black',
        buble_background: 'bg-[#EAEAEA]/90',
        background: 'bg-white',
        navbar_background: 'bg-[#EAEAEA]',
        svg_image: 'light'
      })
    } else if (temp === 'temizle') {
      setOutGoingMessage('')
      setInComingMessage('')
      setHistory('')
      setMessageArray([])
      window.speechSynthesis.cancel()
    } else if (temp === 'tamam') {
      window.speechSynthesis.cancel()
    }
  }

  const SetCommand = withLogger(SetCommandLog, 'SetCommand')

  // Promptları backende uygun hale getirir
  const SetMessageLog = (_results: any[]) => {
    const commandForGpt = [
      ' hey',
      'hey',
      'eymak',
      'Ey Eman',
      'Hey ema',
      'Hey Ema',
      'Hey ama',
      'hey ema',
      ' hey Ema',
      'Ey ama',
      'Ey ema',
      'Ey Ema',
      'ey ema',
      'ey Ema',
      'iyi Ema',
      'iyi ema',
      'ilk Ema',
      'ilk ema',
      'e Ema',
      'e ema',
      'eyemouth',
      'Ema'
    ]

    if (_results.length === 0) return
    let temp: any | undefined = _results[_results.length - 1].transcript
    console.log('Transcript = ', temp)

    commandForGpt.forEach((command: string) => {
      if (temp.startsWith(command)) {
        if (temp.slice(command.length + 1, temp.length).startsWith(' ')) {
          setOutGoingMessage(temp.slice(command.length + 2, temp.length))
        } else {
          setOutGoingMessage(temp.slice(command.length + 1, temp.length))
        }
      } else {
        SetCommand(temp)
      }
    })
  }

  const SetMessage = withLogger(SetMessageLog, 'SetMessage')

  return (
    <ChatContext.Provider
      value={{
        temp,
        setTemp,
        AddOutGoing,
        AddInComing,
        OutGoingMessage,
        Audio,
        setAudio,
        setOutGoingMessage,
        MessageArray,
        setMessageArray,
        Room,
        setRoom,
        Theme,
        setTheme,
        SetMessage,
        MessageRequest,
        InComingMessage,
        setInComingMessage,
        History,
        setHistory,
        Speech2Text
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}
