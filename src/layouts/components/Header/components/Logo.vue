<template>
  <div class="logo-container">
    <transition enter-active-class="animate__animated animate__fadeInLeft">
      <router-link class="logo-link" to="/">
        <img src="../../../../assets/logo.svg" class="logo-image" />
      </router-link>
    </transition>
  </div>
</template>
<script setup lang="ts"></script>
<style scoped lang="scss">
.logo-container {
  width: 20px;
  height: $height;
  margin-right: 10px;

  .logo-image {
    width: 20px;
    height: 20px;
  }
  .logo-link {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
}
</style>
