import Request from '@/utils/request'
const client = new Request({
  baseURL: '/api/bqss'
})
export const updateBaseUrl = (url: string) => {
  client.updateBaseUrl(url)
}
export interface IList {
  author: string
  chapter: string
  link: string
  name: string
  time: string
}

export const search = (name?: string): Promise<IList[]> =>
  client.request({
    url: '',
    params: {
      name
    }
  })
export const getBook = (
  book: string
): Promise<
  {
    name: string
    link: string
  }[]
> =>
  client.request({
    url: '',
    params: {
      book
    }
  })
export const getChapter = (
  chapter: string
): Promise<{
  title: string
  content: string
  prev: string
  dir: string
  next: string
}> =>
  client.request({
    params: {
      chapter
    }
  })
