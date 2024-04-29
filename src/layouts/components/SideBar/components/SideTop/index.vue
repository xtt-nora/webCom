<template>
  <div class="sidebar-top">
    <div class="sidebar-au">
      <div class="avatar">
        <!-- <img src="@/assets/img/avatar.jpg" alt="avatar" /> -->
        <img :src="imgUrl || defaultImg" alt="avatar" />
      </div>
      <span class="username">{{ username }}</span>
    </div>
    <!-- <div class="sidebar-au"><svg-icon icon-class="late" /><span class="late">最近</span></div> -->
    <router-link :to="{ name: 'collect' }" class="sidebar-au">
      <svg-icon icon-class="late" /><span class="late">最近</span>
    </router-link>
    <!-- <div class="sidebar-au"><svg-icon icon-class="stars" /><span class="late">收藏夹</span></div> -->
    <router-link :to="{ name: 'collect' }" class="sidebar-au">
      <svg-icon icon-class="stars" /><span class="late">收藏夹</span>
    </router-link>
    <router-link :to="{ name: 'write' }" class="sidebar-au">
      <svg-icon icon-class="write" /><span class="late">写文章</span>
    </router-link>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import defaultImg from "@/assets/img/avatar.jpg";
import { useUserStore } from "@/stores/modules/user";
const userStore = useUserStore();
const imgUrl = computed(() => userStore.userInfo.imgUrl);
const username = computed(() => userStore.userInfo.name);
</script>
<style scoped lang="scss">
.sidebar-top {
  // padding: 0 15%;
  height: 180px;

  @include flexStart;

  border-bottom: 1px solid var(--el-border-color);
}

.sidebar-au {
  width: 70%;
  // padding: 0px 15%;
  padding: 0 15% 5px;
  margin-bottom: 5px;
  cursor: pointer;

  @include flexRStart;
}

.username {
  margin-left: 10px;
}

.late {
  display: inline-block;
  margin-left: 10px;
  color: black;
}

.avatar {
  width: 40px;
  height: 40px;
  overflow: hidden;
  border-radius: 50%;

  img {
    width: 100%;
    height: 100%;
  }
}
// .is-bold {
//   background-color: var(--menu-focus);
// }
</style>
