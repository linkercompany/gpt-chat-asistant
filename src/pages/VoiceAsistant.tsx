import siyah from '../assets/siyah.svg'
import beyaz from '../assets/beyaz.svg'
import { ChatContext } from '../contexts/ChatContext'
import { IsWriting } from '../components/VoiceAsistant'
import { useContext, useEffect, useRef, useState } from 'react'
import useSpeechToText from 'react-hook-speech-to-text'
import { Button } from 'antd'

// export const ChatAsistant = () => {
//   const ScrollingBottom = useRef<any>(null)
//   const {
//     // OutGoingMessage,
//     // setOutGoingMessage,
//     // Room,
//     // setRoom,
//     // setTheme,
//     // MessageRequest,
//     // Theme,
//     // Available,
//     // InComingMessage,
//     // setInComingMessage,
//     // setHistory,
//     // AddOutGoing,
//     // AddInComing,
//     // MessageArray,
//     // setMessageArray,
//     Speech2Text
//   } = useContext(ChatContext)

//   // const { error, interimResult, isRecording, results, setResults, startSpeechToText, stopSpeechToText } = useSpeechToText({
//   //   continuous: true,
//   //   crossBrowser: true,
//   //   googleCloudRecognitionConfig: {
//   //     languageCode: 'tr-TR'
//   //   },
//   //   googleApiKey: 'AIzaSyCKkxJ4z3bmDbP8tR0TFf-8_LDjZUChmeI',
//   //   useLegacyResults: false,
//   //   timeout: 1000000
//   //   // useOnlyGoogleCloud: true
//   // })

//   // console.log(Speech2Text.results)

//   // function ReadOut(message: string) {
//   //   const speech = new SpeechSynthesisUtterance()
//   //   speech.text = message
//   //   const allVoices = speechSynthesis.getVoices()
//   //   console.log(allVoices)
//   //   // speech.voice = allVoices[103]
//   //   // speech.volume = 100
//   //   speech.rate = 0.95
//   //   speech.lang = 'tr-TR'
//   //   window.speechSynthesis.speak(speech)
//   //   console.log('konuşuyor')
//   // }

//   // useEffect(() => {
//   //   Speech2Text.startSpeechToText()
//   // }, [])

//   // // Giden mesaj
//   // useEffect(() => {
//   //   if (OutGoingMessage.length === 0) return
//   //   AddOutGoing()
//   //   MessageRequest()
//   //   Speech2Text.stopSpeechToText()
//   // }, [OutGoingMessage])

//   // // Gelen mesaj
//   // useEffect(() => {
//   //   if (InComingMessage.length === 0) return
//   //   AddInComing()
//   //   Speech2Text.startSpeechToText()
//   //   ReadOut(InComingMessage)
//   // }, [InComingMessage])

//   // useEffect(() => {
//   //   ScrollingBottom.current?.scrollIntoView({ behavior: 'smooth' })
//   // }, [InComingMessage, OutGoingMessage])

//   // // Promptları backende uygun hale getirir
//   // const SetMessage = (_results: any) => {
//   //   if (_results.length !== 0) {
//   //     let temp: any | undefined = _results[_results.length - 1]
//   //     if (temp.transcript) {
//   //       if (
//   //         temp.transcript.startsWith('Hey kapsül') ||
//   //         temp.transcript.startsWith('ey kapsül') ||
//   //         temp.transcript.startsWith('Hey Kapsül') ||
//   //         temp.transcript.startsWith('iyi kapsül') ||
//   //         temp.transcript.startsWith('Ey kapsül') ||
//   //         temp.transcript.includes('kapsül') ||
//   //         temp.transcript.startsWith('ilk Kapsül') ||
//   //         temp.transcript.startsWith('e kapsül') ||
//   //         temp.transcript.startsWith(' Hey kapsül') ||
//   //         temp.transcript.startsWith(' ey kapsül') ||
//   //         temp.transcript.startsWith(' Hey Kapsül') ||
//   //         temp.transcript.startsWith(' iyi kapsül') ||
//   //         temp.transcript.startsWith(' Ey kapsül') ||
//   //         temp.transcript.includes(' kapsül') ||
//   //         temp.transcript.startsWith(' ilk Kapsül') ||
//   //         temp.transcript.startsWith(' e kapsül')
//   //       ) {
//   //         if (OutGoingMessage === temp.transcript.slice(10, temp.transcript.length)) return
//   //         console.log(temp.transcript.slice(10, temp.transcript.length))
//   //         setOutGoingMessage(temp.transcript.slice(10, temp.transcript.length))
//   //       }
//   //     }
//   //   }
//   // }

//   // useEffect(() => {
//   //   SetMessage(Speech2Text.results)
//   // }, [Speech2Text.results])

//   console.log(Speech2Text.results[Speech2Text.results.length - 1])

//   if (Speech2Text.error) {
//     console.log(Speech2Text.error)
//     return <p>{Speech2Text.error}</p>
//   }

//   // return (
//   //   <div
//   //     className={`m-w-[100vw] m-h-[100vh] box-border cursor-pointer  bg-center bg-no-repeat bg-[length:70vw_70vh] ${Theme.text_color}`}
//   //     style={{
//   //       backgroundImage: `url(${Theme.svg_image === 'light' ? siyah : beyaz})`
//   //     }}
//   //   >
//   //     {/* <button onClick={isRecording ? stopSpeechToText : startSpeechToText}>{isRecording ? 'Stop Recording' : 'Start Recording'}</button> */}
//   //     <div className={` flex flex-col justify-end  ${Available ? 'h-[100vh]' : 'h-[95vh]'}	`}>
//   //       <div className="overflow-auto scroll-smooth  ">
//   //         {MessageArray.map((message: any) => {
//   //           return message
//   //         })}
//   //         <div ref={ScrollingBottom}></div>
//   //       </div>
//   //     </div>
//   //     {Available ? '' : <IsWriting />}
//   //     {/* <Button
//   //       onClick={() => {
//   //         recognition.start()
//   //       }}
//   //     >
//   //       Ses Aç
//   //     </Button>
//   //     <Button
//   //       onClick={() => {
//   //         recognition.stop()
//   //       }}
//   //     >
//   //       Ses Kapa
//   //     </Button> */}
//   //     {/* <Button
//   //       onClick={() => {
//   //         ReadOut('merhaba benim adım Ema nasıl yardımcı olabilirim')
//   //       }}
//   //     >
//   //       Konuş
//   //     </Button> */}
//   //   </div>
//   // )
//   return (
//     <div>
//       <button onClick={Speech2Text.isRecording ? Speech2Text.stopSpeechToText : Speech2Text.startSpeechToText}>{Speech2Text.isRecording ? 'Stop Recording' : 'Start Recording'}</button>
//     </div>
//   )
// }


export const ChatAssistant = () => {
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
    setMessageArray,
    Speech2Text
  } = useContext(ChatContext)
  const ScrollingBottom = useRef<any>(null)
  const [isListening, setIsListening] = useState(false)

  useEffect(() => {
    if (!Speech2Text.isRecording && isListening) {
      console.log('Starting speech recognition...')
      // Speech2Text.startSpeechToText()
    } else if (Speech2Text.isRecording && !isListening) {
      console.log('Stopping speech recognition...')
      // Speech2Text.stopSpeechToText()
    }
  }, [Speech2Text, isListening])

  useEffect(() => {
    // Speech2Text.startSpeechToText()
  }, [])

  // Giden mesaj
  useEffect(() => {
    if (OutGoingMessage.length === 0) return
    AddOutGoing()
    MessageRequest()
    // Speech2Text.stopSpeechToText()
  }, [OutGoingMessage])

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

  // Gelen mesaj
  useEffect(() => {
    if (InComingMessage.length === 0) return
    AddInComing()
    // Speech2Text.startSpeechToText()
    ReadOut(InComingMessage)
  }, [InComingMessage])

  useEffect(() => {
    ScrollingBottom.current?.scrollIntoView({ behavior: 'smooth' })
  }, [InComingMessage, OutGoingMessage])

  const toggleListening = () => {
    setIsListening((prevIsListening) => !prevIsListening)
  }

  // Promptları backende uygun hale getirir
  const SetMessage = (_results: any) => {
    if (_results.length !== 0) {
      let temp: any | undefined = _results[_results.length - 1]
      if (temp.transcript) {
        if (
          temp.transcript.startsWith('Hey kapsül') ||
          temp.transcript.startsWith('ey kapsül') ||
          temp.transcript.startsWith('Hey Kapsül') ||
          temp.transcript.startsWith('iyi kapsül') ||
          temp.transcript.startsWith('Ey kapsül') ||
          temp.transcript.includes('kapsül') ||
          temp.transcript.startsWith('ilk Kapsül') ||
          temp.transcript.startsWith('e kapsül') ||
          temp.transcript.startsWith(' Hey kapsül') ||
          temp.transcript.startsWith(' ey kapsül') ||
          temp.transcript.startsWith(' Hey Kapsül') ||
          temp.transcript.startsWith(' iyi kapsül') ||
          temp.transcript.startsWith(' Ey kapsül') ||
          temp.transcript.includes(' kapsül') ||
          temp.transcript.startsWith(' ilk Kapsül') ||
          temp.transcript.startsWith(' e kapsül')
        ) {
          if (OutGoingMessage === temp.transcript.slice(10, temp.transcript.length)) return
          console.log(temp.transcript.slice(10, temp.transcript.length))
          setOutGoingMessage(temp.transcript.slice(10, temp.transcript.length))
        }
      }
    }
  }

  useEffect(() => {
    console.log('Speech2Text.results: new', Speech2Text.results[Speech2Text.results.length - 1])
    console.log('Speech2Text.error:', Speech2Text.error)
    // SetMessage(Speech2Text.results[Speech2Text.results.length - 1])
    SetMessage(Speech2Text.results)
  }, [Speech2Text.results, Speech2Text.error])

  if (Speech2Text.error) {
    console.log('Speech recognition error:', Speech2Text.error)
    return <p>{Speech2Text.error}</p>
  }

  return (
    <div
      className={`m-w-[100vw] m-h-[100vh] box-border cursor-pointer  bg-center bg-no-repeat bg-[length:70vw_70vh] ${Theme.text_color}`}
      style={{
        backgroundImage: `url(${Theme.svg_image === 'light' ? siyah : beyaz})`
      }}
    >
      <button onClick={Speech2Text.isRecording ? Speech2Text.stopSpeechToText : Speech2Text.startSpeechToText}>{Speech2Text.isRecording ? 'Stop Recording' : 'Start Recording'}</button>
      <div className={` flex flex-col justify-end  ${Available ? 'h-[100vh]' : 'h-[95vh]'}	`}>
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
      {/* <Button
        onClick={() => {
          ReadOut('merhaba benim adım Ema nasıl yardımcı olabilirim')
        }}
      >
        Konuş
      </Button> */}
    </div>
  )
}