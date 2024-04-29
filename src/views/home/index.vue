<template>
  <div class="home">
    <div class="home-top">
      <div>运维服务</div>
      <div>
        <el-dropdown trigger="click" @command="handleCommand">
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
    <div class="home-content">
      <BaseCard :card-list="card"></BaseCard>
    </div>
  </div>
</template>
<script setup lang="ts" name="home">
import BaseCard from "@/components/base-card/BaseCard.vue";
import basecard from "@/assets/json/card.json";
interface ArrType {
  [key: string]: any;
}
const card = ref<ArrType[]>([]);
onMounted(() => {
  card.value = basecard.data.nerbar;
});
const handleCommand = (command: string) => {
  console.log(command);
  // card.value = nameTitle(card.value);
  if (command === "name") {
    card.value = nameTitle(card.value);
  } else if (command === "createTime") {
    card.value = bubble(card.value);
  }
};

// 按照创建时间排序 createTime
// 1.时间转换成时间戳
// 2.使用冒泡排序对比时间戳从小到大输出item
const bubble = (arr: ArrType[]) => {
  arr.forEach(item => {
    item.createTime = new Date(item.createTime).getTime();
  });
  let len = arr.length;
  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j].createTime > arr[j + 1].createTime) {
        let temp = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = temp;
      }
    }
  }
  return arr;
};
// 按照名称排序 name
// 1.正则匹配+sort排序
//  2.正则表达式/A-z/缺点：先排英文再排中文
const nameTitle = (arr: ArrType[]) => {
  arr.sort((a, b) => {
    let reg = /^[A-z]/;
    if (reg.test(a.title) || reg.test(b.title)) {
      console.log(reg.test(a.title), reg.test(b.title));
      if (a.title > b.title) {
        return 1;
      } else if (a.title < b.title) {
        return -1;
      } else {
        return 0;
      }
    } else {
      return a.title.localeCompare(b.title, "zh");
    }
  });
  return arr;
};
watch(card, val => {
  console.log(val);
});
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  height: 100%;
  &-top {
    height: 22px;
    padding: 8px 0 0 0;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
  }
  &-content {
    width: 100%;
    height: calc(100% - 30px);
    flex: 1;
  }
}
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
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
