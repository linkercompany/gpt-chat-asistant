import OriginalAxios from 'axios'

import { textToSpeechUrl } from '../config'

export const axiosForTextToSpeech = OriginalAxios.create({
  baseURL: textToSpeechUrl,
  withCredentials: true
})
