import { axios } from '.'

export const newRequest = async (message: string, historyID?: string) => {
  if (historyID?.length !== 0) {
    try {
      const res = await axios.post(`/openai/interactiveChat?systemKey=interactive&historyId=${historyID}`, {
        message: { content: message, role: 'user' },
        jsonParseContent: true,
        openaiConfig: {
          temperature: 1
        }
      })
      if (res.data.status === 'success') return res.data.result
    } catch (error) {
      console.error(error)
      return { message: { content: 'Suncuda bir hata oluştu!' }, historyId: '' }
    }
  } else {
    try {
      const res = await axios.post('/openai/interactiveChat?systemKey=interactive', {
        message: { content: message, role: 'user' },
        jsonParseContent: true,
        openaiConfig: {
          temperature: 1
        }
      })
      if (res.data.status === 'success') return res.data.result
    } catch (error) {
      console.error(error)
      return { message: { content: 'Suncuda bir hata oluştu!' }, historyId: '' }
    }
  }
}
