import { RouteRecordRaw } from 'vue-router'
const AccountRouter: Array<RouteRecordRaw> = [
  {
    path: '/novel',
    component: () => import('@/views/Novel/index.vue'),
    meta: {
      title: '书城'
    }
  },
  {
    path: '/novel/search',
    component: () => import('@/views/Novel/search.vue'),
    meta: {
      title: '搜索'
    }
  },
  {
    path: '/novel/book',
    component: () => import('@/views/Novel/book.vue'),
    meta: {
      title: '目录'
    }
  },
  {
    path: '/novel/chapter',
    component: () => import('@/views/Novel/chapter.vue'),
    meta: {
      title: '章节'
    }
  }
]
export default AccountRouter
