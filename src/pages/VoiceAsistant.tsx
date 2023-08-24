import siyah from '../assets/siyah.svg'
import beyaz from '../assets/beyaz.svg'
import { ChatContext } from '../contexts/ChatContext'
import { IsWriting } from '../components/VoiceAsistant'
import { useContext, useEffect, useRef, useState } from 'react'
import useSpeechToText from 'react-hook-speech-to-text'
import { Button } from 'antd'

export const ChatAsistant = () => {
  const ScrollingBottom = useRef<any>(null)
  const [once, setOnce] = useState(false)
  const {
    OutGoingMessage,
    setOutGoingMessage,
    Room,
    setRoom,
    setTheme,
    MessageRequest,
    Theme,
    Available,
    InComingMessage,
    setInComingMessage,
    setHistory,
    AddOutGoing,
    AddInComing,
    MessageArray,
    setMessageArray
  } = useContext(ChatContext)

  const { error, interimResult, isRecording, results, setResults, startSpeechToText, stopSpeechToText } = useSpeechToText({
    continuous: true,
    crossBrowser: true,
    googleCloudRecognitionConfig: {
      languageCode: 'tr-TR'
    },
    googleApiKey: 'AIzaSyCKkxJ4z3bmDbP8tR0TFf-8_LDjZUChmeI',
    useLegacyResults: false,
    timeout: 1000000
  })

  // const socket = new WebSocket('ws://kale.kapsulteknoloji.org/facetime/room/connect') // Sunucu adresine ve portuna göre değiştirin

  // useEffect(() => {
  //   // Bağlantı başlatıldığında çalışacak işlev
  //   socket.onopen = () => {
  //     console.log('WebSocket bağlantısı başarıyla sağlandı.')

  //     // Sunucuya veri gönderme
  //     socket.send('Merhaba, sunucu!')
  //   }
  // }, [])

  // // Sunucudan mesaj alındığında çalışacak işlev
  // socket.onmessage = (event) => {
  //   const receivedData = event.data
  //   console.log('Sunucudan gelen veri:', receivedData)
  //   if (!once) {
  //     setOnce(true)
  //     setRoom(receivedData)
  //   }
  // }

  // useEffect(() => {
  //   if (Room.length === 0) return
  //   // Bağlantı kapatıldığında çalışacak işlev
  //   socket.onclose = (event) => {
  //     if (event.wasClean) {
  //       console.log(`Bağlantı temiz bir şekilde kapatıldı, kod: ${event.code}, neden: ${event.reason}`)
  //     } else {
  //       console.error('Bağlantı kesildi.')
  //     }
  //   }
  //   window.location.href = `http://localhost:4000/n Fatih Güman/${Room}`
  // }, [Room])

  // // Bağlantı hatası oluştuğunda çalışacak işlev
  // socket.onerror = (error) => {
  //   console.error('Hata oluştu:', error)
  // }

  function ReadOut(message: string) {
    const speech = new SpeechSynthesisUtterance()
    speech.text = message
    const allVoices = speechSynthesis.getVoices()
    // speech.voice = allVoices[103]
    console.log(allVoices)
    // speech.volume = 100
    speech.rate = 0.95
    speech.lang = 'tr-TR'
    window.speechSynthesis.speak(speech)
    console.log('konuşuyor')
  }

  useEffect(() => {
    startSpeechToText()
  }, [])
  // Giden mesaj
  useEffect(() => {
    if (OutGoingMessage.length === 0) return
    AddOutGoing()
    MessageRequest()
    stopSpeechToText()
  }, [OutGoingMessage])
  // Gelen mesaj
  useEffect(() => {
    if (InComingMessage.length === 0) return
    AddInComing()
    startSpeechToText()
    ReadOut(InComingMessage)
  }, [InComingMessage])

  // Promptları backende uygun hale getirirx
  const SetMessage = (_results: any) => {
    if (results.length !== 0) {
      let temp: any | undefined = _results[_results.length - 1]
      if (temp.transcript) {
        if (temp.transcript.startsWith('Hey kapsül', 'ey kapsül', 'Hey Kapsül', 'iyi kapsül', 'Ey kapsül', 'kapsül', 'ilk Kapsül', 'e kapsül')) {
          setOutGoingMessage(temp.transcript.slice(10, temp.transcript.length))
        }
      }
    }
  }

  useEffect(() => {
    SetMessage(results)
  }, [results])

  console.log(results[results.length - 1])

  if (error) {
    return <p>{error}</p>
  }

  // const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
  // console.log(SpeechRecognition)
  // const recognition = new SpeechRecognition()

  // recognition.onstart = function () {
  //   console.log('Ses tanıma başlatıldı')
  // }
  // recognition.onend = function (e: any) {
  //   console.log('Ses tanıma durduruldu')
  // }

  // recognition.onresult = function (e) {
  //   let current = e.resultIndex
  //   let transcript = e.results[current][0].transcript
  //   console.log(transcript)
  //   console.log(e)
  // }
  // recognition.onerror = function (e) {
  //   console.log(e)
  //   return <div>desteklemiyor</div>
  // }
  // recognition.continuous = true

  return (
    <div
      className={`m-w-[100vw] m-h-[100vh] box-border cursor-pointer  bg-center bg-no-repeat bg-[length:70vw_70vh] ${Theme.text_color}`}
      style={{
        backgroundImage: `url(${Theme.svg_image === 'light' ? siyah : beyaz})`
      }}
    >
      ;<button onClick={isRecording ? stopSpeechToText : startSpeechToText}>{isRecording ? 'Stop Recording' : 'Start Recording'}</button>
      <div className={` flex flex-col justify-end  ${Available ? 'h-[95vh]' : 'h-[90vh]'}	`}>
        <div className="overflow-auto scroll-smooth  ">
          {MessageArray.map((message: any) => {
            return message
          })}
          <div ref={ScrollingBottom}></div>
        </div>
      </div>
      {Available ? '' : <IsWriting />}
      {/* <Button
        onClick={() => {
          recognition.start()
        }}
      >
        Ses Aç
      </Button>
      <Button
        onClick={() => {
          recognition.stop()
        }}
      >
        Ses Kapa
      </Button> */}
      {/* {InComingMessage.length === 0 ? (
        ''
      ) : (
        <Button
          onClick={() => {
            ReadOut('merhaba benim adım Ema    nasıl yardımcı olabilirim')
          }}
        >
          Konuş
        </Button>
      )} */}
    </div>
  )
}
