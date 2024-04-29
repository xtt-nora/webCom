<template>
  <div class="headerLeft">
    <div class="header" v-for="(item, index) in menuList" :key="index">
      <div :class="['header-button', { 'is-bold': selectedButtonIndex === item.path }]" @click="handlePush(item.path!)">
        {{ item.meta.title }}
      </div>
    </div>
    <!-- 搜索 -->
    <search></search>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
import search from "./components/Search.vue";
import { useAuthStore } from "@/stores/modules/auth";
const authStore = useAuthStore();
const router = useRouter();
const selectedButtonIndex = ref("");
onMounted(() => {
  selectedButtonIndex.value = menuList.value[0].path;
  handlePush(menuList.value[0].path);
  console.log(menuList, "menuList");
});
function handlePush(path: string) {
  selectedButtonIndex.value = path;
  router.push(path);
}
const menuList = computed(() => authStore.showMenuListGet);
</script>
<style lang="scss" scoped>
@import url("./index.scss");
</style>
