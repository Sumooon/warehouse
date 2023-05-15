import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const constantFiles = require.context('./constant', true, /\.ts$/)
let constantModules: Array<RouteRecordRaw> = []
constantFiles.keys().forEach((key) => {
  if (key === './index.ts') return
  constantModules = constantModules.concat(constantFiles(key).default)
})

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      component: () => import('@/views/Home.vue'),
      meta: {
        title: '主页'
      }
    },
    ...constantModules
  ]
  // scrollBehavior(to, form, savePosition) {
  //   console.log('save ', savePosition)
  //   if (savePosition) {
  //     return savePosition
  //   }
  //   return {
  //     left: 0,
  //     top: 0
  //   }
  // }
})
export default router
