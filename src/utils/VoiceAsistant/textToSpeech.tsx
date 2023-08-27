import { axiosForTextToSpeech } from '..'

export const textToSpeech = async (message: string) => {
  try {
    const res = await axiosForTextToSpeech.post('/text-to-speech', { text: message })
    if (res.data.status === 'success') return res.data
  } catch (error) {
    console.error(error)
    return false
  }
}
