<template>
  <van-config-provider>
    <router-view></router-view>
  </van-config-provider>
</template>
<script lang="ts" setup></script>

<style lang="scss">
#app {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  // height: 100%;
  overflow-x: hidden;
  background: #f0f1f2;
  font-size: xxx-large;
}
</style>
