<template>
  <div class="fall" ref="fContainerRef">
    <WaterFall :bottom="20" :column="column" :gap="10" :page-size="20" :request="getArticle">
      <template #item="{ item, index, imageHeight }">
        <Card
          :detail="{
            imageHeight,
            title: item.title,
            author: item.author,
            bgColor: colorArr[index % (colorArr.length - 1)],
            avatar: item.avatar,
            url: item.url
          }"
        />
      </template>
    </WaterFall>
  </div>
</template>
<script setup lang="ts">
import WaterFall from "./components/WaterFall.vue";
import Card from "./components/Card.vue";
import data1 from "./config/data1.json";
import data2 from "./config/data2.json";
import { ICardItem } from "./components/type";
import data3 from "@/assets/json/card.json";
import { allArticle } from "@/api/modules/article";
interface ArrType {
  [key: string]: any;
}
const card = ref<ArrType[]>([]);
const colorArr = ["#409eff", "#67c23a", "#e6a23c", "#f56c6c", "#909399"];
const fContainerRef = ref<HTMLDivElement | null>();
const column = ref(4);
const fContainerObserver = new ResizeObserver(entries => {
  changeColumn(entries[0].target.clientWidth);
});

const changeColumn = (width: number) => {
  if (width > 960) {
    column.value = 5;
  } else if (width >= 690 && width < 960) {
    column.value = 4;
  } else if (width >= 500 && width < 690) {
    column.value = 3;
  } else {
    column.value = 2;
  }
};

onMounted(() => {
  getArticle();
  fContainerRef.value && fContainerObserver.observe(fContainerRef.value);
});

onUnmounted(() => {
  fContainerRef.value && fContainerObserver.unobserve(fContainerRef.value);
});
// const list1: ICardItem[] = data1.data.items.map(i => ({
//   id: i.id,
//   url: i.note_card.cover.url_pre,
//   width: i.note_card.cover.width,
//   height: i.note_card.cover.height,
//   title: i.note_card.display_title,
//   author: i.note_card.user.nickname
// }));
// const list2: ICardItem[] = data2.data.items.map(i => ({
//   id: i.id,
//   url: i.note_card.cover.url_pre,
//   width: i.note_card.cover.width,
//   height: i.note_card.cover.height,
//   title: i.note_card.display_title,
//   author: i.note_card.user.nickname
// }));

const getArticle = async (page: number, pageSize: number) => {
  const { data } = await allArticle();
  data.forEach((item: any) => {
    item.tags = JSON.parse(item.tags);
    item.image_url = JSON.parse(item.image_url);
    item.url = item.cover;
    item.avatar = item.cover;
  });
  card.value = data;
  return new Promise<ICardItem[]>(resolve => {
    setTimeout(() => {
      resolve(card.value.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize));
    }, 1000);
  });
};
// const list3: ICardItem[] = data3.data.article.map(i => ({
//   id: i.id,
//   url: i.src,
//   width: i.width,
//   height: i.height,
//   title: i.title,
//   author: i.author,
//   avatar: i.src
// }));
// const list = [...card.value];
// const list = [...list3];
// const getData = (page: number, pageSize: number) => {
//   getArticle();
//   const list = [...card.value];
//   console.log(list);
//   console.log(card.value);
//   return new Promise<ICardItem[]>(resolve => {
//     setTimeout(() => {
//       resolve(list.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize));
//     }, 1000);
//   });
// };
</script>
<style scoped lang="scss">
.fall {
  width: calc(100% - 10px);
  height: calc(100% - 10px);
  padding-top: 10px;
  // border: 1px solid red;
}

.box {
  width: 250px;
}
</style>
