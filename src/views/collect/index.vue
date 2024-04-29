<template>
  <div class="collect">
    <div class="collect-top">
      <div class="collect-top-left">
        <h3>我的收藏夹</h3>
        <div class="collect-top-left-list">
          <div
            v-for="item in titleList"
            :key="item.value"
            :class="['collect-top-left-list-item', { 'is-collect': selectedIndex === item.value }]"
            @click="handleItem(item)"
          >
            {{ item.label }}
          </div>
        </div>
      </div>
      <div class="collect-top-right">
        <div @click="handleAll">全部收藏</div>
      </div>
    </div>
    <div class="collect-card">
      <BaseCard :card-list="card"></BaseCard>
    </div>
  </div>
</template>
<script setup lang="ts" name="collect">
import BaseCard from "@/components/base-card/BaseCard.vue";
import collectList from "@/assets/json/collectList.json";
interface ArrType {
  [key: string]: any;
}
const card = ref<ArrType[]>([]);
const selectedIndex = ref("home");
const titleList = reactive([
  {
    label: "特殊服务",
    value: "home"
  },
  {
    label: "文章收藏",
    value: "article"
  },
  {
    label: "软件收藏",
    value: "software"
  }
]);
const handleItem = item => {
  selectedIndex.value = item.value;
};
const handleAll = () => {
  card.value = collectList.data.nerbar.filter(item => {
    return item.collect === true;
  });
};
onMounted(() => {
  //   card.value = collectList.data.nerbar;
});
watch(
  selectedIndex,
  val => {
    card.value = collectList.data.nerbar.filter(item => {
      return item.type === val && item.collect === true;
    });
  },
  {
    deep: true,
    immediate: true
  }
);
</script>
<style scoped lang="scss">
.collect {
  width: 100%;
  height: calc(100% - 20px);
  margin-top: 20px;
  position: relative;
  &-top {
    @include spaceBetween;
    &-left {
      cursor: pointer;
      @include flexRStart;
      h3 {
        @include largeFont;
        margin-right: 10px;
        padding-bottom: 3px;
      }
      &-list {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        @include smallFont;
        &-item {
          margin-right: 10px;
          padding-bottom: 3px;
        }
      }
    }
    &-right {
      cursor: pointer;
    }
  }
  &-card {
    height: calc(100% - 52px);
  }
}
.is-collect {
  border-bottom: 1px solid red;
}
</style>
