<template>
  <div class="flex flex-content-center justify-between">
    <HeaderLeft></HeaderLeft>
    <HeaderRight></HeaderRight>
  </div>
  <el-divider />
</template>
<script setup lang="ts">
// import logo from "./components/Logo.vue";
import HeaderLeft from "./components/HeaderLeft/index.vue";
import HeaderRight from "./components/HeaderRight/index.vue";
</script>
<style scoped lang="scss">
.el-divider--horizontal {
  display: block;
  height: 1px;
  width: 100%;
  margin: 0;
  border-top: 1px var(--el-border-color) var(--el-border-style);
}
</style>
