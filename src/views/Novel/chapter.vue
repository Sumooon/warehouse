<template>
  <NavBar :title="state.title" left-text="返回" left-arrow @click-left="handleBack" />
  <div class="content" v-html="state.content"></div>
  <div class="footer">
    <div @click="handleClick(-1)">上一章</div>
    <div @click="handleBack">返回目录</div>
    <div @click="handleClick(1)">下一章</div>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getChapter } from '@/apis/bqss'
import { NavBar } from 'vant'

const router = useRouter()
const route = useRoute()
const { title, url, link } = route.query
const state = reactive({
  title: '',
  content: '',
  prev: '',
  dir: '',
  next: ''
})
const getInfo = (link: string) => {
  getChapter(link).then((res) => {
    Object.assign(state, {
      ...res,
      content: res.content.replace(/\n/g, '<br/>')
    })
  })
}
onMounted(() => getInfo(link as string))
const handleBack = () => {
  router.push({
    path: '/novel/book',
    query: {
      title,
      url
    }
  })
}
const handleClick = (type: number) => {
  let path = state.prev
  if (type) {
    path = state.next
  }
  document.querySelector('#app')?.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
  getInfo(path)
}
</script>

<style scoped lang="scss">
.content {
  font-size: large;
  padding: 1rem;
  margin-bottom: 3rem;
  line-height: 2.5rem;
}
.footer {
  width: 100%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
  div {
    color: #1989fa;
  }
  div + div {
    margin-left: 1rem;
  }
}
</style>
