<template>
  <Row class="toll-bar">
    <!-- <Col span="6">
      <DropdownMenu>
        <DropdownItem
          v-model="state.source"
          :options="state.sourceOpt"
          @change="handleMenuItemChange"
        />
      </DropdownMenu>
    </Col> -->
    <Col span="24">
      <Search
        v-model="state.search"
        placeholder="请输入书名/作者"
        @search="handleSearch"
        @clear="handleClear"
      />
    </Col>
  </Row>
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
import { Search, List, Cell, DropdownMenu, DropdownItem, Col, Row } from 'vant'
import { reactive } from 'vue'
import { search, IList, updateBaseUrl } from '@/apis/bqss'
import router from '@/router'
const state = reactive({
  source: '/api/bqj',
  // sourceOpt: [
  //   {
  //     text: 'biqusoso',
  //     value: '/api/bqss'
  //   },
  //   {
  //     text: 'iqubige',
  //     value: '/api/bqj'
  //   }
  // ],
  loading: false,
  search: '',
  data: [] as IList[]
})
const renderLabel = (item: IList) => {
  return (
    (item.chapter ? `最新章节: ${item.chapter}` : '') + (item.time ? ` 更新时间: ${item.time}` : '')
  )
}
// const handleMenuItemChange = (val: string) => {
//   updateBaseUrl(val)
//   state.search && handleSearch(state.search)
// }
const handleSearch = (val: string) => {
  state.loading = true
  state.data = []
  search(val).then((res) => {
    state.loading = false
    state.data = res
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

<style scoped lang="scss">
.toll-bar {
  background: #ffffff;
  align-items: center;
  :deep(.van-dropdown-menu__bar) {
    box-shadow: none;
  }
}
</style>
