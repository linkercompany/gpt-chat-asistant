import { axiosForGptConnector } from '..'

import { withLoggerAsync } from '../../log'

const messageRequestLog = async (message: string, historyID?: string) => {
  if (historyID?.length !== 0) {
    try {
      const res = await axiosForGptConnector.post(
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
      const res = await axiosForGptConnector.post(
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

export const messageRequest = withLoggerAsync(messageRequestLog, 'messageRequest')
