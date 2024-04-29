<template>
  <div class="headerLeft">
    <!-- 主题切换 -->
    <div class="box" @click="toggleDark()">
      <svg-icon :icon-class="isDark ? 'dark' : 'light'" />
    </div>
    <div class="box">
      <svg-icon icon-class="late" />
    </div>
    <div class="box">
      <svg-icon :icon-class="isDark ? 'ringsDark' : 'rings'" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { useDark, useToggle } from "@vueuse/core";
const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>
<style scoped lang="scss">
.headerLeft {
  @include center;
  cursor: pointer;
  .box {
    padding: 10px;
  }
}
</style>
