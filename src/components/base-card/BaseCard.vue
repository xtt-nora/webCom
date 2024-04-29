<template>
  <div class="base-card">
    <el-card
      style="width: 18%"
      v-for="(item, index) in cardList"
      :key="index"
      shadow="hover"
      class="card"
      @mouseenter="handleMouseEnter(item)"
      @mouseleave="handleMouseLeave()"
    >
      <div class="collect" v-show="isCollect === item.id || item.collect" @click="collectItem(item)">
        <svg-icon :icon-class="item.collect ? 'collected' : 'stars'" />
      </div>
      <div class="card-img">
        <img :src="item.src" alt="img" />
      </div>
      <div class="card-content">
        <div class="card-content-title">{{ item.title }}</div>
        <div class="card-content-note">{{ item.note }}</div>
        <div class="card-content-author" v-show="item.author">作者：{{ item.author }}</div>
        <div class="card-content-create mt-10px" v-show="item.create_time">
          <svg-icon icon-class="calendar" class="mr-10px" />{{ item.create_time }}
        </div>
        <div class="card-content-tag mt-10px" v-show="item.tags">
          <svg-icon icon-class="tag" size="1.3em" />
          <el-tag v-for="items in item.tags" :key="items" type="info" effect="dark" size="small" class="tagItem">
            {{ items }}
          </el-tag>
        </div>
        <div class="card-content-jump" @click="jump(item)">跳转</div>
      </div>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import router from "@/router";
import { useCommonState } from "@/stores/modules/common";
const commonState = useCommonState();
interface CardListType {
  cardList?: CardItem[];
}
interface CardItem {
  id: number;
  type: string;
  src: string;
  title: string;
  note: string;
  collect: boolean;
  createTime: string;
  create_time: string;
  author: string;
  tags: [];
}
defineProps<CardListType>();
const isCollect = ref(-1); //转换值
const jump = (data: any) => {
  commonState.setCommon(data);
  router.push({ path: `/${data.type}/${data.type}Data` });
};
const handleMouseEnter = (item: CardItem) => {
  isCollect.value = item.id;
  // item.collect = true;
};
const handleMouseLeave = () => {
  isCollect.value = -1;
};
// 点击收藏
const collectItem = (item: CardItem) => {
  item.collect = !item.collect;
};
</script>
<style scoped lang="scss">
@import "./index.scss";
</style>
