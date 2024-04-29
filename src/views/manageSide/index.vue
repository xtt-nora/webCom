<template>
  <div class="manageside">
    <div class="manageside-header">
      <div class="header" v-for="(item, index) in manageList" :key="index">
        <div
          :class="['header-button', { 'is-bold  animate__animated animate__fadeInLeft': selectedButtonIndex === item.path }]"
          @click="handlePush(item.path!, index)"
        >
          {{ item.meta.title }}
        </div>
      </div>
    </div>
    <div class="manageside-content">
      <user-message v-show="changeIndex === 0" />
      <softwareMessage v-show="changeIndex === 1" />
      <audit v-show="changeIndex === 2" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { useAuthStore } from "@/stores/modules/auth";
import userMessage from "./userMessage/index.vue";
import softwareMessage from "./softwareMessage/index.vue";
import audit from "./audit/index.vue";
import { computed, onMounted, ref } from "vue";
const authStore = useAuthStore();
const manageList = ref([]);
const selectedButtonIndex = ref("");
const changeIndex = ref(0);
const menuList = computed(() => authStore.showMenuListGet);
onMounted(() => {
  getMansgeList();
  selectedButtonIndex.value = manageList.value[0].path;
  handlePush(manageList.value[0].path, 0);
});
const getMansgeList = () => {
  let selectNode = menuList.value.find(item => {
    return item.name === "manageSide";
  });
  manageList.value = selectNode.children;
};
function handlePush(path: string, index: number) {
  selectedButtonIndex.value = path;
  changeIndex.value = index;
}
</script>
<style scoped lang="scss">
.manageside {
  box-sizing: border-box;
  display: flex;
  flex-flow: column nowrap;
  height: 100%;

  &-header {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    height: 60px;
    margin-top: 20px;
    margin-right: 20px;
    background-color: var(--menu-focus);
    border-radius: $br;
  }
}

.header {
  @include mediumFont;

  height: $height;
  padding: 10px 5px;
  margin-right: 10px;
  line-height: $height;
  cursor: pointer;

  &-button {
    padding: 0 10px;
  }

  &-button:hover {
    // font-weight: bolder;
  }

  .is-bold {
    color: var(--el-color-primary);
    // font-weight: bolder;
    // background-color: $focus-color;
    // background-color: var(--menu-focus);
    border-radius: 10px;

    @include largeFont;
  }
}
</style>
