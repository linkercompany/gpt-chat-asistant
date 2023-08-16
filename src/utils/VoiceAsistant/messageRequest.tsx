import { axios } from '..'

export const messageRequest = async (message: string, historyID?: string) => {
  if (historyID?.length !== 0) {
    try {
      const res = await axios.post(
        `/openai/interactiveChat`,
        {
          message: { content: message, role: 'user' },
          jsonParseContent: true,
          openaiConfig: {
            temperature: 1
          }
        },
        { params: { systemKey: 'interactive', historyId: historyID } }
      )
      if (res.data.status === 'success') return res.data.result
    } catch (error) {
      console.error(error)
      return { message: { content: 'Suncuda bir hata oluştu!' }, historyId: '' }
    }
  } else {
    try {
      const res = await axios.post(
        '/openai/interactiveChat',
        {
          message: { content: message, role: 'user' },
          jsonParseContent: true,
          openaiConfig: {
            temperature: 1
          }
        },
        { params: { systemKey: 'interactive' } }
      )
      if (res.data.status === 'success') return res.data.result
    } catch (error) {
      console.error(error)
      return { message: { content: 'Suncuda bir hata oluştu!' }, historyId: '' }
    }
  }
}
