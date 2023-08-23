import siyah from '../assets/siyah.svg'
import beyaz from '../assets/beyaz.svg'
import { ChatContext } from '../contexts/ChatContext'
import { IsWriting } from '../components/VoiceAsistant'
import { useContext, useEffect, useRef, useState } from 'react'
import useSpeechToText from 'react-hook-speech-to-text'

export const ChatAsistant = () => {
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
  // 2

  // Giden mesaj
  useEffect(() => {
    AddOutGoing()
    MessageRequest()
  }, [OutGoingMessage])
  // Gelen mesaj
  useEffect(() => {
    AddInComing()
  }, [InComingMessage])

  const ScrollingBottom = useRef<any>(null)

  const { error, interimResult, isRecording, results, startSpeechToText, stopSpeechToText } = useSpeechToText({
    continuous: true,
    crossBrowser: true,
    googleCloudRecognitionConfig: {
      languageCode: 'tr-TR'
    },
    googleApiKey: 'AIzaSyCKkxJ4z3bmDbP8tR0TFf-8_LDjZUChmeI',
    useLegacyResults: false
  })

  const setup = (_results: any) => {
    if (results.length !== 0) {
      let temp: any | undefined = _results[_results.length - 1]
      if (temp.transcript) {
        if (temp.transcript.includes('Hey kapsül')) {
          setOutGoingMessage(temp.transcript.slice(10, temp.transcript.length))
        }
      }
    }
  }

  useEffect(() => {
    setup(results)
  }, [results])

  console.log(results[results.length - 1])

  if (error) {
    return <p>{error}</p>
  }

  return (
    <div
      className={`m-w-[100vw] m-h-[100vh] box-border cursor-pointer  bg-center bg-no-repeat bg-[length:70vw_70vh] ${Theme.text_color}`}
      style={{
        backgroundImage: `url(${Theme.svg_image === 'light' ? siyah : beyaz})`
      }}
    >
      ;<button onClick={isRecording ? stopSpeechToText : startSpeechToText}>{isRecording ? 'Stop Recording' : 'Start Recording'}</button>
      <div className={` flex flex-col justify-end  ${Available ? 'h-[100vh]' : 'h-[95vh]'}	`}>
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
