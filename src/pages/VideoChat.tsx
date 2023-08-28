import React, { useEffect, useRef, useState } from 'react'
import Peer from 'peerjs'
import { useNavigate, useParams } from 'react-router-dom'

import { withLogger } from '../log'

const VideoChatLog = () => {
  return <div></div>
}

export const VideoChat = withLogger(VideoChatLog, 'VideoChat')
