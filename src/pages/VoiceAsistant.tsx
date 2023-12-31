import siyah from '../assets/siyah.svg'
import beyaz from '../assets/beyaz.svg'
import { ChatContext } from '../contexts/ChatContext'
import { IsWriting } from '../components/VoiceAsistant'
import { useContext, useEffect, useRef, useState } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

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
  // Speech başlatma ve socket açılışı
  useEffect(() => {
    SpeechRecognition.startListening({
      continuous: true,
      language: 'tr'
    })
    // Bağlantı başlatıldığında çalışacak işlev
    // socket.onopen = () => {
    //   console.log('WebSocket bağlantısı başarıyla sağlandı.')

    //   // Sunucuya veri gönderme
    //   socket.send('Merhaba, sunucu!')
    // }
  }, [])
  // Sunucudan mesaj alındığında çalışacak işlev
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
  //   window.location.href = `http://localhost:4000/Fatih Güman/${Room}`
  // }, [Room])
  // Bağlantı hatası oluştuğunda çalışacak işlev
  // socket.onerror = (error) => {
  //   console.error('Hata oluştu:', error)
  // }

  function ReadOut(message: string) {
    const speech = new SpeechSynthesisUtterance()
    speech.text = message
    // const allVoices = speechSynthesis.getVoices()
    // speech.voice = allVoices[103]
    // console.log(allVoices)
    // speech.volume = 100
    speech.rate = 0.95
    speech.lang = 'tr-TR'
    window.speechSynthesis.speak(speech)
    console.log('konuşuyor')
  }
  // Komutlar
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
  // Speech to text tanımlama kısmı
  const { resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition({ commands })
  // Yeni mesaj geldiğinde alt kısma kaydırır
  const ScrollingBottom = useRef<any>(null)
  useEffect(() => {
    ScrollingBottom.current?.scrollIntoView({ behavior: 'smooth' })
  }, [InComingMessage, OutGoingMessage])
  // Giden mesaj
  useEffect(() => {
    AddOutGoing()
    MessageRequest()
  }, [OutGoingMessage])
  // Gelen mesaj
  useEffect(() => {
    AddInComing()
    ReadOut(InComingMessage)
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
