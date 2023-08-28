import { axiosForTextToSpeech } from '..'
import { withLoggerAsync } from '../../log'

const textToSpeechTo = async (message: string) => {
  try {
    const res = await axiosForTextToSpeech.post('/text-to-speech', { text: message })
    if (res.data.status === 'success') return res.data
  } catch (error) {
    console.error(error)
    return false
  }
}

export const textToSpeech = withLoggerAsync(textToSpeechTo, 'textToSpeech')
