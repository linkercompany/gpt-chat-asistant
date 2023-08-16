import React, { useEffect, useRef, useState } from 'react'
import Peer from 'peerjs'
import { useNavigate, useParams } from 'react-router-dom'

export const VideoChat = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const peer = new Peer() // PeerJS nesnesi oluştur

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }

        // Diğer kullanıcıyla bağlantı kur
        peer.on('open', (peerId) => {
          console.log('My Peer ID:', peerId)

          // Çağrıları dinle
          peer.on('call', (call) => {
            console.log('Incoming call')
            call.answer(stream) // Gelen çağrıyı yanıtla ve kendi medya akışını gönder
            call.on('stream', (remoteStream) => {
              // Diğer kullanıcının akışını alarak göster
              if (videoRef.current) {
                videoRef.current.srcObject = remoteStream
              }
            })
          })
        })
      })
      .catch((error) => {
        console.error('Error accessing media devices:', error)
      })
  }, [])

  return (
    <div>
      <video ref={videoRef} autoPlay muted style={{ width: '100%', maxWidth: '600px' }}></video>
    </div>
  )
}
