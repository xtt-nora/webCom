<template>
  <div class="article-data">
    <div class="article-data-title">
      <h1>{{ articleData.title }}</h1>
    </div>
    <div class="article-data-note">
      <span> <svg-icon icon-class="calendar" class="mr-10px" />{{ time }}</span>
      <span>作者：{{ articleData.author }}</span>
    </div>
    <div class="article-data-content">
      <div v-html="articleData.content"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useCommonState } from "@/stores/modules/common";
import { formatDate } from "@/utils/time.ts";
const commonState = useCommonState();
const articleData = computed(() => commonState.commonData);
const time = ref("");
watch(
  articleData,
  newVal => {
    // console.log(newVal, "val");
    time.value = formatDate(newVal.create_time);
  },
  {
    deep: true,
    immediate: true
  }
);
</script>
<style scoped lang="scss">
.article-data {
  &-title {
    height: 30px;
    margin: 24px 0 16px;
  }

  &-note {
    padding: 10px 0;
    margin: 20px 0;
    border-top: 1px dashed #cacaca;
    border-bottom: 1px dashed #cacaca;

    span {
      display: inline-block;
      margin-right: 10px;

      @include smallFont;

      color: #757575;
    }
  }

  h1 {
    @include largeFontBlod;
  }
}
</style>
