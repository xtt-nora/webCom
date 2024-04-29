<template>
  <div class="search">
    <el-input v-model="input" style="width: 240px" placeholder="Please input" />
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
const input = ref("");
</script>
<style scoped lang="scss">
.search {
  padding: 10px;
  margin-right: 10px;
  height: $height;
  line-height: $height;
}
</style>
