import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ChatContext } from '../contexts/ChatContext'
import io from 'socket.io-client' // Socket.io kütüphanesini ekleyin

export const VideoChat = () => {
  const { OutGoingMessage, SetMessage, Audio, setAudio, Room, setRoom, Theme, InComingMessage, AddOutGoing, AddInComing, MessageArray, Speech2Text } = useContext(ChatContext)
  const [text, setText] = useState('')
  // const socket = io('ws://localhost:8080', { transports: ['websocket'] }) // Socket.io bağlantısı oluşturun
  // const socket = io('wss://kale.kapsulteknoloji.org') // Socket.io bağlantısı oluşturun
  // , { transports: ['websocket'] }

  const ws = new WebSocket('ws://kale.kapsulteknoloji.org')

  function aç() {
    ws.addEventListener('open', () => {
      console.log('Bağlandık...')

      // ws.send()
    })
  }

  useEffect(() => {
    aç()
  }, [])

  function gönder() {
    ws.addEventListener('message', (message) => {
      console.log(message.data)
      ws.send('test12345')
    })
  }

  function kapat() {
    ws.addEventListener('close', () => {
      console.log('Bağlanmakdık..')
      // ws.send('Kapat')
    })
  }

  useEffect(() => {
    // Bağlantı başlatıldığında çalışacak işlev
    // Bağlantı kapatıldığında çalışacak işlev
    // socket.on('disconnect', (reason) => {
    //   console.log(`Bağlantı kapatıldı, neden: ${reason}`)
    // })
    // return () => {
    //   // Komponent sona erdiğinde socket bağlantısını kapatın
    //   socket.disconnect()
    // }
  }, [])

  return (
    <div>
      <button
        onClick={() => {
          gönder()
          console.log('gönderdik')
        }}
      >
        Gönder
      </button>
      <button
        onClick={() => {
          kapat()
          console.log('kapatıldı')
        }}
      >
        Kapat
      </button>
    </div>
  )
}
