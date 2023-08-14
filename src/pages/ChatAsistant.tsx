import { Button } from 'antd'
import { ChatContext } from '../contexts/ChatContext'
import { useContext, useEffect, useRef } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { IsWriting } from '../components'

export const ChatAsistant = () => {
  // 1
  const { OutGoingMessage, setOutGoingMessage, NewRequest, Available, IsWrite, setIsWrite, InComingMessage, setInComingMessage, setHistory, AddOutGoing, AddInComing, MessageArray, setMessageArray } =
    useContext(ChatContext)
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
      command: 'hey kapsül *',
      callback: (e: string) => {
        resetTranscript()
        setOutGoingMessage(e)
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
    NewRequest()
  }, [OutGoingMessage])

  useEffect(() => {
    AddInComing()
  }, [InComingMessage])

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>
  }

  return (
    <div className="m-w-[100vw] m-h-[100vh] box-border text-white">
      <div className="flex justify-center items-center  h-[15vh] ">
        <h1 className=" text-7xl">Kapsül ChatBot</h1>
      </div>
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
      <div className={` flex flex-col justify-end h-[80vh] ${Available ? '' : 'h-[70vh]'}	`}>
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
