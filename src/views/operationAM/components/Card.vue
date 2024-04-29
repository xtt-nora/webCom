<template>
  <div class="card">
    <div class="card-image">
      <img :src="props.detail.url" style="width: 100%; height: 100%" />
    </div>
    <div class="card-footer">
      <div class="title"></div>
      <div class="author">
        <div class="author-info">
          <!-- <div class="avatar"></div> -->
          <img :src="props.detail.avatar" class="avatar" />
          <span class="name">{{ props.detail.author }}</span>
        </div>
        <div class="like">100</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
interface ICardDetail {
  bgColor: string;
  title: string;
  author: string;
  imageHeight: number;
  [key: string]: any;
}
const props = defineProps<{
  detail: ICardDetail;
}>();
</script>
<style scoped lang="scss">
.card {
  width: 100%;
  height: 100%;
  background-color: #fff;

  &-image {
    width: 100%;
    height: v-bind("`${$props.detail.imageHeight}px`");
    background-color: v-bind("$props.detail.bgColor");
    border: 1px solid #eee;
    border-radius: 20px;
  }

  &-footer {
    padding: 12px;
    font-size: 14px;

    .title {
      display: -webkit-box;
      margin-bottom: 8px;
      overflow: hidden;
      color: rgb(51 51 51 / 80%);
      word-break: break-all;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }

    .author {
      display: flex;
      gap: 5px;
      align-items: center;
      justify-content: space-between;
      font-size: 13px;

      .author-info {
        display: flex;
        flex: 1;
        align-items: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        .avatar {
          width: 20px;
          height: 20px;
          margin-right: 6px;
          background-color: v-bind("props.detail.bgColor");
          border: 1px solid rgb(0 0 0 / 8%);
          border-radius: 20px;
        }

        .name {
          width: 80%;
          overflow: hidden;
          color: rgb(51 51 51 / 80%);
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>
