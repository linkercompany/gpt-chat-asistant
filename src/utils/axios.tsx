import OriginalAxios from 'axios'

import { apiUrl } from '../config'

export const axios = OriginalAxios.create({
  baseURL: apiUrl,
  withCredentials: true
})
