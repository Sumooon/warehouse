<template>
  <Search
    v-model="state.search"
    placeholder="请输入书名/作者"
    @search="handleSearch"
    @clear="handleClear"
  />
  <List v-model:loading="state.loading" finished-text="没有了" @load="handleLoad">
    <Cell
      v-for="(item, index) of state.data"
      :key="index"
      :title="item.name"
      :value="item.author"
      :label="renderLabel(item)"
      @click="handleSelect(item)"
    />
  </List>
</template>

<script setup lang="ts">
import { Search, List, Cell } from 'vant'
import { reactive } from 'vue'
import { search, IList } from '@/apis/bqss'
import router from '@/router'
const state = reactive({
  loading: false,
  search: '',
  data: [] as IList[]
})
const renderLabel = (item: IList) => {
  return item.chapter
    ? `最新章节: ${item.chapter}`
    : '' + item.time
    ? ` 更新时间: ${item.time}`
    : ''
}
const handleSearch = (val: string) => {
  state.loading = true
  search(val).then((res) => {
    state.loading = false
    state.data = res || []
  })
}
const handleClear = () => {
  state.search = ''
}
const handleLoad = () => {
  state.loading = false
}
const handleSelect = (item: IList) => {
  router.push({
    path: '/novel/book',
    query: {
      title: item.name,
      url: item.link
    }
  })
}
</script>

<style scoped lang="scss"></style>
