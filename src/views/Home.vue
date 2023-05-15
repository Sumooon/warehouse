<template>
  <div class="content">
    <div v-for="(item, index) of modules" :key="index" class="item" @click="handleClick(item.path)">
      {{ item.name }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
const modules = [
  {
    name: '书',
    path: '/novel/search'
  }
  // {
  //   name: 'A',
  //   path: '/novel'
  // },
  // {
  //   name: 'B',
  //   path: '/novel'
  // },
  // {
  //   name: 'C',
  //   path: '/novel'
  // },
  // {
  //   name: 'D',
  //   path: '/novel'
  // }
]
const handleClick = (path: string) => {
  router.push({
    path
  })
}
</script>

<style scoped lang="scss">
.content {
  display: grid;
  grid-template-columns: repeat(3, calc(33.33% - 1.5rem));
  grid-template-rows: repeat(3, 10rem);
  grid-gap: 2rem;
  padding: 1rem;
  .item {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    // font-size: 10rem;
    box-shadow: 0px 12px 32px 4px rgba(0, 0, 0, 0.04), 0px 8px 20px rgba(0, 0, 0, 0.08);
    border-radius: 1rem;
  }
}
</style>
