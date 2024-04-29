<template>
  <el-main>
    <router-view v-slot="{ Component, route }" :key="$route.fullPath">
      <transition appear name="fade-transform" mode="out-in">
        <keep-alive>
          <component :is="Component" v-if="isRouterShow" :key="route.fullPath" />
        </keep-alive>
      </transition>
    </router-view>
  </el-main>
</template>
<script setup lang="ts">
// 注入刷新页面方法
const isRouterShow = ref(true);
const refreshCurrentPage = (val: boolean) => (isRouterShow.value = val);
provide("refresh", refreshCurrentPage);
</script>
<style scoped lang="scss">
.el-main {
  --el-main-padding: 20px;
  display: block;
  flex: 1;
  flex-basis: auto;
  overflow: auto;
  box-sizing: border-box;
  margin: var(--el-main-padding) 0 var(--el-main-padding) var(--el-main-padding);
  padding: 0;
}
</style>
