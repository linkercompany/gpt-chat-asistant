import OriginalAxios from 'axios'

import { gptConnectorUrl } from '../config'

export const axiosForGptConnector = OriginalAxios.create({
  baseURL: gptConnectorUrl,
  withCredentials: true
})
