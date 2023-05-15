<template>
  <NavBar title="书库" />
  <Button icon="plus" @click="handleAdd">添加</Button>
</template>

<script setup lang="ts">
import { Button, NavBar } from 'vant'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const handleAdd = () => {
  router.push({
    path: '/novel/search'
  })
}
</script>

<style scoped></style>
