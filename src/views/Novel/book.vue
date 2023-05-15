<template>
  <NavBar :title="state.title" left-text="返回" left-arrow @click-left="handleBack" />
  <div class="content">
    <div
      v-for="(item, index) of state.data"
      :key="index"
      class="item"
      @click="handleClick(item.link)"
    >
      {{ item.name }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { NavBar } from 'vant'
import { getBook } from '@/apis/bqj'
const router = useRouter()
const route = useRoute()
const { title, url } = route.query
const state = reactive({
  title,
  data: [] as {
    name: string
    link: string
  }[]
})
onMounted(() => {
  getBook(url as string).then((res) => {
    console.log('res ', res)
    state.data = res && res.length ? res.reverse() : []
  })
})
const handleClick = (link: string) => {
  router.push({
    path: '/novel/chapter',
    query: {
      link,
      title,
      url
    }
  })
}
const handleBack = () => {
  router.push({
    path: '/novel/search'
  })
}
</script>

<style scoped lang="scss">
.content {
  display: flex;
  flex-flow: column;
  font-size: initial;
  grid-gap: 1rem;
  padding: 1rem;
  .item {
    // width: 100%;
    // height: 100%;
    // display: flex;
    // align-items: center;
    // justify-content: center;
    cursor: pointer;
    // font-size: 10rem;
  }
}
</style>
