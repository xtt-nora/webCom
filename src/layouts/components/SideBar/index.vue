<template>
  <div class="side">
    <div class="content">
      <side-top></side-top>
      <div class="tree"></div>
      <div class="footer">
        <div class="avatar">
          <img src="@/assets/img/avatar.jpg" alt="avatar" />
        </div>
        <span class="username">地大博创</span>
      </div>
    </div>
    <el-divider direction="vertical" />
  </div>
</template>
<script setup lang="ts">
import SideTop from "./components/SideTop/index.vue";
</script>
<style scoped lang="scss">
.side {
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
}

.content {
  display: flex;
  flex-flow: column nowrap;
  width: 99%;
  height: 100%;
  // position: relative;
}

.tree {
  flex: 1;
}

.el-divider--vertical {
  height: 100%;
}

.username {
  margin-left: 10px;
}

.late {
  display: inline-block;
  margin-left: 10px;
  color: black;
}

.footer {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  height: 100px;
}

.avatar {
  width: 40px;
  height: 40px;
  overflow: hidden;
  border-radius: 50%;

  img {
    width: 100%;
    height: 100%;
  }
}
</style>
