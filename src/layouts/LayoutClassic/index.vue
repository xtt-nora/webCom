<template>
  <el-container>
    <el-aside>
      <SideBar></SideBar>
    </el-aside>
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <Main></Main>
    </el-container>
  </el-container>
</template>
<script setup lang="ts">
import Main from "@/layouts/components/Main/index.vue";
import Header from "@/layouts/components/Header/index.vue";
import SideBar from "@/layouts/components/SideBar/index.vue";
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
