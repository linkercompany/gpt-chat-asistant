// Kapsül logosu
import siyah from '../assets/siyah.svg'
// Linker logosu
import dikeySiyah from '../assets/dikeySiyah.svg'
import dikeyBeyaz from '../assets/dikeyBeyaz.svg'

import { useContext, useEffect, useRef } from 'react'
import { ChatContext } from '../contexts/ChatContext'
import { IsWriting } from '../components/VoiceAsistant'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const ChatAssistant = () => {
  const ScrollingBottom = useRef<any>(null)
  const { OutGoingMessage, SetMessage, Audio, Theme, InComingMessage, AddOutGoing, AddInComing, MessageArray, Speech2Text } = useContext(ChatContext)

  // İlk render olduğunda mikrofonu açar
  useEffect(() => {
    setTimeout(() => {
      Speech2Text.startSpeechToText()
      AddInComing("Merhaba benim adım Ema, size yardımcı olmak için buradayım. 'Hey Ema' komutu ile benimle konuşabilirsiniz.")
    }, 1000)
  }, [])

  // Giden mesaj
  useEffect(() => {
    AddOutGoing(OutGoingMessage)
  }, [OutGoingMessage])

  // Gelen mesaj
  useEffect(() => {
    AddInComing(InComingMessage)
  }, [InComingMessage])

  // Sesli komuttan gelen veriyi hazırlar
  useEffect(() => {
    SetMessage(Speech2Text.results)
    console.log('Speech2Text : ', Speech2Text.results)
  }, [Speech2Text.results])

  // Sürekli aşşağı kaymasını sağlar
  useEffect(() => {
    ScrollingBottom.current?.scrollIntoView({ behavior: 'smooth' })
  }, [InComingMessage, OutGoingMessage])

  // Speech to text error trigger
  if (Speech2Text.error) {
    return <p>{Speech2Text.error}</p>
  }
  //
  return (
    <div
      className={`m-w-[100vw] m-h-[100vh] box-border cursor-pointer  bg-center bg-no-repeat bg-[length:70vw_70vh] relative scrollbar-width-none ${Theme.text_color}`}
      style={{
        backgroundImage: `url(${Theme.svg_image === 'light' ? dikeySiyah : dikeyBeyaz})`
      }}
    >
      {Speech2Text.isRecording ? <FontAwesomeIcon className={` mt-[0.5vh] ml-[0.5vh] absolute  h-[1vh] w-[1vh] text-red-600 `} icon={faCircle} /> : ''}
      {Audio ? Audio : ''}
      <div className={` flex flex-col justify-end  ${Speech2Text.isRecording ? 'h-[100vh]' : 'h-[90vh]'} scrollbar-width-none	`}>
        <div className="overflow-auto scroll-smooth scrollbar-width-none ">
          {MessageArray.map((message: any) => {
            return message
          })}
          <div ref={ScrollingBottom}></div>
        </div>
      </div>
      {Speech2Text.isRecording ? '' : <IsWriting />}
    </div>
  )
}
