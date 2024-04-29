<template>
  <div class="write-tags">
    <el-tag v-for="tag in dynamicTags" :key="tag" closable :disable-transitions="false" @close="handleClose(tag)" class="tags">
      {{ tag }}
    </el-tag>
    <el-popover :width="400" trigger="click">
      <template #reference>
        <el-button class="button-new-tag" size="small"> 添加标签</el-button>
      </template>
      <div class="popover-content">
        <div class="popover-content-top">
          <div class="popover-content-top-right">还可添加{{ number }}个标签</div>
          <div class="popover-content-top-left">
            <span>找不到标签？</span>
            <el-tooltip class="box-item" effect="dark" content="暂无权限" placement="right-start">
              <span class="cursor-pointer text-blueGray">创建</span>
            </el-tooltip>
          </div>
        </div>
        <el-tag v-for="item in tags.data" :key="item" type="primary" class="tags" @click="addTags(item)">
          {{ item }}
        </el-tag>
      </div>
    </el-popover>
  </div>
</template>
<script setup lang="ts">
import tags from "@/assets/json/tags.json"; //后端返回的tags类型
interface EmitType {
  (e: "onags", params: string[]): void;
}
const emit = defineEmits<EmitType>();
const dynamicTags = ref<string[]>([]);
const number = ref(4);
const addTags = (item: string) => {
  dynamicTags.value.push(item);
  dynamicTags.value = [...new Set(dynamicTags.value)];
  // number.value = tags.data.length - dynamicTags.value.length;
};
const handleClose = (tag: string) => {
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1);
};
watch(
  dynamicTags,
  newVal => {
    number.value = tags.data.length - newVal.length;
    emit("onags", dynamicTags.value);
  },
  {
    deep: true,
    immediate: true
  }
);
</script>
<style scoped lang="scss">
@import "../../index.scss";
</style>
