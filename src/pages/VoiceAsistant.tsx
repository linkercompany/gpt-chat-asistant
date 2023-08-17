import { Button } from 'antd'
import { ChatContext } from '../contexts/ChatContext'
import { useContext, useEffect, useRef } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { IsWriting } from '../components/VoiceAsistant'
import io from 'socket.io-client'
import { useNavigate } from 'react-router-dom'
import siyah from '../assets/siyah.svg'
import beyaz from '../assets/beyaz.svg'

export const ChatAsistant = () => {
  // 1
  const { OutGoingMessage, setOutGoingMessage, setTheme, MessageRequest, Theme, Available, InComingMessage, setInComingMessage, setHistory, AddOutGoing, AddInComing, MessageArray, setMessageArray } =
    useContext(ChatContext)

  const navigate = useNavigate()
  // 2
  const ScrollingBottom = useRef<any>(null)
  // 3
  const commands = [
    {
      command: 'Hey kapsül *',
      callback: (e: string) => {
        resetTranscript()
        setOutGoingMessage(e)
        console.log(e)
      }
    },

    {
      command: 'Hey Kapsül *',
      callback: (e: string) => {
        resetTranscript()
        console.log(e)

        setOutGoingMessage(e)
      }
    },
    {
      command: 'hey Kapsül *',
      callback: (e: string) => {
        resetTranscript()
        setOutGoingMessage(e)
        console.log(e)
      }
    },
    {
      command: 'ey Kapsül *',
      callback: (e: string) => {
        resetTranscript()
        setOutGoingMessage(e)
        console.log(e)
      }
    },
    {
      command: 'hey kapsül *',
      callback: (e: string) => {
        resetTranscript()
        setOutGoingMessage(e)
        console.log(e)
      }
    },
    {
      command: 'ey kapsül *',
      callback: (e: string) => {
        resetTranscript()
        setOutGoingMessage(e)
        console.log(e)
      }
    },
    {
      command: 'Karanlık temaya geç',
      callback: () => {
        setTheme({
          text_color: 'text-white',
          buble_background: 'bg-[#333333]/90',
          background: 'bg-black',
          navbar_background: 'bg-[#333333]/50',
          svg_image: 'dark'
        })
      }
    },
    {
      command: 'Karanlık demeye geç',
      callback: () => {
        setTheme({
          text_color: 'text-white',
          buble_background: 'bg-[#333333]/90',
          background: 'bg-black',
          navbar_background: 'bg-[#333333]/50',
          svg_image: 'dark'
        })
      }
    },
    {
      command: 'Aydınlık temaya geç',
      callback: () => {
        setTheme({
          text_color: 'text-black',
          buble_background: 'bg-[#EAEAEA]/90',
          background: 'bg-white',
          navbar_background: 'bg-[#EAEAEA]',
          svg_image: 'light'
        })
      }
    },
    {
      command: 'Aydınlık demeye geç',
      callback: () => {
        setTheme({
          text_color: 'text-black',
          buble_background: 'bg-[#EAEAEA]/90',
          background: 'bg-white',
          navbar_background: 'bg-[#EAEAEA]',
          svg_image: 'light'
        })
      }
    },
    {
      command: '*',
      callback: (e: string) => {
        console.log(e)
      }
    },
    {
      command: 'temizle',
      callback: () => {
        resetTranscript()
        setOutGoingMessage('')
        setInComingMessage('')
        console.log('temizle')

        setHistory('')
        setMessageArray([])
      }
    }
  ]
  // 4
  const { resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition({ commands })
  // 5
  useEffect(() => {
    ScrollingBottom.current?.scrollIntoView({ behavior: 'smooth' })
  }, [InComingMessage, OutGoingMessage])

  useEffect(() => {
    SpeechRecognition.startListening({
      continuous: true,
      language: 'tr'
    })
  }, [])

  useEffect(() => {
    AddOutGoing()
    MessageRequest()
  }, [OutGoingMessage])

  useEffect(() => {
    AddInComing()
  }, [InComingMessage])

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>
  }

  return (
    <div
      className={`m-w-[100vw] m-h-[100vh] box-border cursor-pointer  bg-center bg-no-repeat bg-[length:70vw_70vh] ${Theme.text_color}`}
      style={{
        backgroundImage: `url(${Theme.svg_image === 'light' ? siyah : beyaz})`
      }}
    >
      <>
        {/* <p className="text-white">{transcript}</p>
      <h1>---------------</h1>
      <h1>{OutGoingMessage}</h1>
      <h1>{InComingMessage}</h1>
      <Button
        className="text-white"
        onClick={() => {
          resetTranscript()
        }}
      >
        reset
      </Button> */}
      </>
      <div className={` flex flex-col justify-end h-[100vh] ${Available ? '' : 'h-[70vh]'}	`}>
        <div className="overflow-auto scroll-smooth  ">
          {MessageArray.map((message: any) => {
            return message
          })}
          <div ref={ScrollingBottom}></div>
        </div>
      </div>
      {Available ? '' : <IsWriting />}
    </div>
  )
}
