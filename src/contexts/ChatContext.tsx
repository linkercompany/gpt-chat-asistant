import { messageRequest } from '../utils'
import useSpeechToText from 'react-hook-speech-to-text'
import { InComingBuble, IsWriting, OutGoingBuble } from '../components/VoiceAsistant'
import React, { ReactNode, createContext, useCallback, useMemo, useState } from 'react'

interface ChatContextType {
  temp: boolean
  OutGoingMessage: string
  Room: string
  History: string
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
  InComingMessage: '',
  setOutGoingMessage: () => {},
  setMessageArray: () => {},
  setTheme: () => {},
  setInComingMessage: () => {},
  AddOutGoing: () => {},
  setRoom: () => {},
  AddInComing: (message: string) => {},
  setHistory: () => {},
  setTemp: () => {},
  MessageRequest: () => {},
  Speech2Text: () => {},
  SetMessage: () => {}
})

export const ChatContextProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [Room, setRoom] = useState<string>('')
  const [temp, setTemp] = useState<boolean>(false)
  const [History, setHistory] = useState<string>('')
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

  // New request for GPT
  const MessageRequest = async () => {
    if (!(OutGoingMessage.length > 0) || !Speech2Text.isRecording) return
    let temp = await messageRequest(OutGoingMessage, History)
    console.log(temp.message)
    setInComingMessage(temp.message.content)
    setHistory(temp.historyId)
  }

  // Add OutGoing Chat Html Element
  const AddOutGoing = () => {
    if (OutGoingMessage.length === 0) return
    Speech2Text.stopSpeechToText()
    let temp = OutGoingMessage.charAt(0).toUpperCase() + OutGoingMessage.slice(1)
    MessageArray.push(<OutGoingBuble message={temp} />)
    setMessageArray(MessageArray)
    setOutGoingMessage('')
    MessageRequest()
  }
  // Sesli konuşma
  function ReadOut(message: string) {
    const speech = new SpeechSynthesisUtterance()
    speech.text = message
    const allVoices = speechSynthesis.getVoices()
    console.log(allVoices)
    // speech.voice = allVoices[103]
    // speech.volume = 100
    speech.rate = 0.95
    speech.lang = 'tr-TR'
    window.speechSynthesis.speak(speech)
    console.log('konuşuyor')
  }

  // Add İnComing Chat Html Element
  const AddInComing = (message: string) => {
    if (message.length === 0) return
    Speech2Text.startSpeechToText()
    let temp = message
    MessageArray.push(<InComingBuble message={temp} />)
    setMessageArray(MessageArray)
    setInComingMessage('')
    ReadOut(InComingMessage)
  }

  // Ui komutları
  const SetCommand = (temp: string) => {
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

  // Promptları backende uygun hale getirir
  const SetMessage = (_results: any[]) => {
    const commandForGpt = ['Hey kapsül', 'Ey kapsül', 'EKAP sim', 'ey kapsül', 'iyi kapsül', 'ilk Kapsül', 'e kapsül']

    if (_results.length === 0) return
    let temp: any | undefined = _results[_results.length - 1].transcript
    console.log('Transcript = ', temp)

    commandForGpt.forEach((command: string) => {
      if (temp.startsWith(command)) {
        setOutGoingMessage(temp.slice(command.length + 1, temp.length))
      } else {
        SetCommand(temp)
      }
    })
  }

  return (
    <ChatContext.Provider
      value={{
        temp,
        setTemp,
        AddOutGoing,
        AddInComing,
        OutGoingMessage,
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
