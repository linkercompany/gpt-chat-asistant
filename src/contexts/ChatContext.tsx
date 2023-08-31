import ReactPlayer from 'react-player'
import { messageRequest, textToSpeech } from '../utils'
import useSpeechToText from 'react-hook-speech-to-text'
import { InComingBuble, IsWriting, OutGoingBuble } from '../components/VoiceAsistant'
import React, { ReactNode, createContext, useCallback, useMemo, useState } from 'react'

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
  MessageRequest: (message: string, history: any) => void
  AddOutGoing: (outGoing: string) => void
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
  setOutGoingMessage: () => {},
  setMessageArray: () => {},
  setTheme: () => {},
  setAudio: () => {},
  setInComingMessage: () => {},
  AddOutGoing: (outGoing: string) => {},
  setRoom: () => {},
  AddInComing: (message: string) => {},
  setHistory: () => {},
  setTemp: () => {},
  MessageRequest: (message: string, history: any) => {},
  Speech2Text: () => {},
  SetMessage: () => {}
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

  // Speech to text libary +
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

  // Mesaj baloncukları için uniq key +
  const getCurrentTimestamp = () => {
    return Math.floor(Date.now() / 1000) // Şu anki zaman damgasını saniye cinsinden alır
  }

  // Promptları backende uygun hale getirir
  const SetMessage = useCallback(
    (_results: any[]) => {
      if (_results.length === 0) return
      const commandForGpt = ['hey', 'ey']
      let temp: any | undefined = _results[_results.length - 1].transcript.toLowerCase().trim()
      console.log('Transcript = ', temp)
      commandForGpt.forEach((command: string) => {
        if (temp.startsWith(command)) {
          setOutGoingMessage(temp.slice(command.length + 1, temp.length))
        } else {
          SetCommand(temp)
        }
      })
    },
    [Speech2Text.results]
  )

  // Ui komutları
  const SetCommand = useCallback(
    (temp: string) => {
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
        setAudio(null)
        window.location.reload()
      } else if (temp === 'tamam') {
        setAudio(null)
        window.location.reload()
      }
    },
    [SetMessage]
  )

  // Add OutGoing Chat Html Element +
  const AddOutGoing = useCallback(
    (outGoing: string) => {
      if (outGoing.length === 0) return
      Speech2Text.stopSpeechToText()
      let temp = outGoing.charAt(0).toUpperCase() + outGoing.slice(1)
      MessageArray.push(<OutGoingBuble key={getCurrentTimestamp()} message={temp} />)
      setMessageArray(MessageArray)
      setOutGoingMessage('')
      MessageRequest(OutGoingMessage, History)
    },
    [OutGoingMessage, SetMessage, History]
  )

  // New request for GPT
  const MessageRequest = async (message: string, history: any) => {
    if (message.length === 0 || !Speech2Text.isRecording) return
    let temp = await messageRequest(message, history)
    TextToSpeech(temp.message.content)
    setInComingMessage(temp.message.content)
    if(history===History)return
    setHistory(temp.historyId)
  }

  // Add İnComing Chat Html Element
  const AddInComing = useCallback(
    (message: string) => {
      if (message.length === 0) return
      Speech2Text.startSpeechToText()
      let temp = message
      MessageArray.push(<InComingBuble key={getCurrentTimestamp()} message={temp} />)
      setMessageArray(MessageArray)
      setInComingMessage('')
    },
    [InComingMessage]
  )

  // Text to speech Api
  const TextToSpeech = useCallback(
    async (message: string) => {
      let temp = await textToSpeech(message)
      if (!temp) return
      let soundUrl = SoundPlayer(temp.result.data)
      setAudio(<ReactPlayer className="hidden" url={soundUrl} controls playing />)
    },
    [InComingMessage]
  )

  // Buffer to Audio
  const SoundPlayer = useCallback(
    (soundData: any) => {
      const bufferToArrayBuffer = (buffer: number[]): ArrayBuffer => {
        return new Uint8Array(buffer).buffer
      }
      const arrayBufferToUrl = (buffer: ArrayBuffer): string => {
        const blob = new Blob([buffer], { type: 'audio/wav' })
        return URL.createObjectURL(blob)
      }
      return arrayBufferToUrl(bufferToArrayBuffer(soundData))
    },
    [TextToSpeech]
  )

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
