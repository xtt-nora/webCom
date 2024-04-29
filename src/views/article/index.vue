<template>
  <div class="article">
    <div class="article-top">
      <div>文件列表</div>
      <div>
        <el-dropdown trigger="click">
          <span class="el-dropdown-link"><svg-icon icon-class="filterIcon" /> </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="name">名称</el-dropdown-item>
              <el-dropdown-item command="running">正在运行</el-dropdown-item>
              <el-dropdown-item command="createTime"> 创建时间</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <div class="article-content">
      <BaseCard :card-list="card"></BaseCard>
    </div>
  </div>
</template>
<script setup lang="ts" name="article">
import BaseCard from "@/components/base-card/BaseCard.vue";
import { allArticle } from "@/api/modules/article";
interface ArrType {
  [key: string]: any;
}
const card = ref<ArrType[]>([]);
onMounted(() => {
  getArticle();
  // card.value = basearticle.data.article;
});

const getArticle = async () => {
  const { data } = await allArticle();
  data.forEach((item: any) => {
    item.tags = JSON.parse(item.tags);
    item.image_url = JSON.parse(item.image_url);
    item.src = item.cover;
  });
  card.value = data;
};
</script>

<style lang="scss" scoped>
.article {
  display: flex;
  flex-direction: column;
  height: 100%;

  &-top {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    height: 22px;
    padding: 8px 0 0;
  }

  &-content {
    flex: 1;
    width: 100%;
    height: calc(100% - 30px);
  }
}

.example-showcase .el-dropdown-link {
  display: flex;
  align-items: center;
  color: var(--el-color-primary);
  cursor: pointer;
}
// .read-the-docs {
//   color: #888;
// }
// .box {
//   width: 100px;
//   height: 100px;
//   // background-color: $bg-color;
// }
</style>
