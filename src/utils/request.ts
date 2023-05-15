import axios, { AxiosResponse } from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'

class Request {
  instance: AxiosInstance
  constructor(props: AxiosRequestConfig) {
    this.instance = axios.create({
      baseURL: props.baseURL,
      timeout: 60 * 1000
    })
    this.instance.interceptors.request.use(
      (config: any) => {
        const params = { ...config.params }
        Object.keys(params).forEach((item: string) => {
          const type = Object.prototype.toString.call(params[item])
          if (type === '[object Array]') {
            if (params[item].length === 0) {
              delete config.params[item]
            }
          } else {
            if (params[item] === '') {
              delete config.params[item]
            }
          }
        })
        return config
      },
      (error) => {
        console.error(`request err: ${error}`)
        return Promise.reject(error)
      }
    )
    this.instance.interceptors.response.use(async (response) => {
      const { data, status } = response
      if (status !== 200) {
        return data
      }

      return data?.data || data
    })
  }

  request<T = any, R = AxiosResponse<T>>(config: AxiosRequestConfig) {
    return this.instance.request<T, R>(config)
  }
}
export default Request
