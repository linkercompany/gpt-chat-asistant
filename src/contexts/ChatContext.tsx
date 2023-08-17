import { messageRequest } from '../utils'
import { InComingBuble, IsWriting, OutGoingBuble } from '../components/VoiceAsistant'
import React, { ReactNode, createContext, useCallback, useMemo, useState } from 'react'

interface ChatContextType {
  temp: boolean
  Available: boolean
  IsWrite: boolean
  OutGoingMessage: string
  Room: string
  History: string
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
  setAvailable: React.Dispatch<React.SetStateAction<boolean>>
  setIsWrite: React.Dispatch<React.SetStateAction<boolean>>
  MessageRequest: () => void
  AddOutGoing: () => void
  AddInComing: () => void
}

interface ChatProviderProps {
  children: ReactNode
}

export const ChatContext = createContext<ChatContextType>({
  temp: false,
  Available: true,
  IsWrite: false,
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
  AddInComing: () => {},
  setAvailable: () => {},
  setIsWrite: () => {},
  setHistory: () => {},
  setTemp: () => {},
  MessageRequest: () => {}
})

export const ChatContextProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [temp, setTemp] = useState<boolean>(false)
  const [MessageArray, setMessageArray] = useState<any[]>([])
  const [OutGoingMessage, setOutGoingMessage] = useState<string>('')
  const [InComingMessage, setInComingMessage] = useState<string>('')
  const [History, setHistory] = useState<string>('')
  const [Room, setRoom] = useState<string>('')
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
  const [Available, setAvailable] = useState<boolean>(true)
  const [IsWrite, setIsWrite] = useState<boolean>(false)

  // New request for GPT
  const MessageRequest = async () => {
    if (!(OutGoingMessage.length > 0)) return
    if (!Available) return
    setAvailable(false)
    let temp = await messageRequest(OutGoingMessage, History)
    console.log(temp)
    setInComingMessage(temp.message.content)
    setHistory(temp.historyId)
  }

  // Add OutGoing Chat Html Element
  const AddOutGoing = async () => {
    if (OutGoingMessage.length === 0) return
    setAvailable(true)
    let temp = OutGoingMessage.charAt(0).toUpperCase() + OutGoingMessage.slice(1)
    MessageArray.push(<OutGoingBuble message={temp} />)
    setMessageArray(MessageArray)
    setOutGoingMessage('')
    setIsWrite(true)
  }

  // Add İnComing Chat Html Element
  const AddInComing = () => {
    if (InComingMessage.length === 0) return
    setAvailable(true)
    let temp = InComingMessage
    MessageArray.push(<InComingBuble message={temp} />)
    setMessageArray(MessageArray)
    setInComingMessage('')
    setIsWrite(false)
  }
  return (
    <ChatContext.Provider
      value={{
        temp,
        setTemp,
        AddOutGoing,
        IsWrite,
        setIsWrite,
        AddInComing,
        OutGoingMessage,
        setOutGoingMessage,
        MessageArray,
        setMessageArray,
        Room,
        setRoom,
        Available,
        setAvailable,
        Theme,
        setTheme,
        MessageRequest,
        InComingMessage,
        setInComingMessage,
        History,
        setHistory
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}
