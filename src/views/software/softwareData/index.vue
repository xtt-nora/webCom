<template>
  <div class="download">
    <div class="download-left animate__animated animate__fadeInLeftBig">
      <div class="download-left-down">
        <div class="down-img">
          <img :src="commonData.src" alt="img" />
        </div>
        <div class="down-type">
          <div class="down-title">{{ commonData.title }}</div>
          <div class="down-public">
            <el-select v-model="value" placeholder="Select" size="small" style="width: 200px">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </div>
        </div>
        <div class="down-update">下载</div>
      </div>
    </div>
    <div class="download-right animate__animated animate__fadeInRightBig">
      <div class="download-right-loop">
        <div class="download-title">软件截图</div>
        <el-carousel :interval="4000" height="200px" arrow="always">
          <el-carousel-item v-for="item in softewareItem.album" :key="item">
            <img :src="item" alt="" />
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="download-right-install">
        <div class="download-title">安装说明</div>
        <div class="tranhtml">
          <iframe
            class="w-full h-full"
            src="https://help.open.kingdee.com/dokuwiki/doku.php?id=%E5%AE%89%E8%A3%85%E9%83%A8%E7%BD%B2"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="softwareData">
import { useCommonState } from "@/stores/modules/common";
import software from "@/assets/json/softeware.json";
const softewareItem = software.data;
const commonState = useCommonState();
const commonData = computed(() => {
  return commonState.commonData;
});
const value = ref("macOS版本");
const options = [
  {
    value: "window11x64版本",
    label: "window11x64版本"
  },
  {
    value: "macOS版本",
    label: "macOS版本"
  },
  {
    value: "window11x32版本",
    label: "window11x32版本"
  }
];
onMounted(() => {
  console.log(commonData); //输出
});
</script>
<style scoped lang="scss">
.download {
  width: 100%;
  height: calc(100% - 20px);
  display: flex;
  margin-top: 20px;
  &-left {
    width: 35%;
    background: url("@/assets/img/bg.jpg") no-repeat;
    background-size: cover;
    border-radius: $br;
    position: relative;
    &-down {
      width: 86%;
      height: 150px;
      margin: 0 7%;
      border-radius: $br;
      background: rgba(0, 0, 0, 0.5);
      position: absolute;
      bottom: 2%;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-items: center;
      justify-content: space-evenly;
      .down-img {
        width: 100px;
        height: 100px;
        img {
          width: 100%;
          height: 100%;
          border-radius: $br;
        }
      }
      .down-title {
        @include largeFont;
        color: #fff;
        margin-bottom: 10px;
      }
      .down-update {
        width: 60px;
        height: 25px;
        line-height: 25px;
        border-radius: 15px;
        @include normalFont;
        color: #307bff;
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
    }
  }
  &-right {
    flex: 1;
    margin-left: 3%;
    height: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    &-loop {
      margin-bottom: 20px;
      height: 240px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    &-install {
      flex: 1;
      height: 100%;
      .tranhtml {
        height: calc(100% - 30px);
      }
    }
  }
}
.el-carousel {
  width: 100%;
  height: 200px;
}
.download-title {
  @include normalFont;
  margin-bottom: 10px;
}
</style>
