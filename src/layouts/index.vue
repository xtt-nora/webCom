<template>
  <component :is="LayoutComponents[layout]" />
</template>
<script setup lang="ts">
import { useGlobalStore } from "@/stores/modules/global";
import { LayoutType } from "@/stores/interface";
import LayoutClassic from "./LayoutClassic/index.vue";
const LayoutComponents: Record<LayoutType, Component> = {
  classic: LayoutClassic
};
const globalStore = useGlobalStore();
const layout = computed(() => globalStore.layout);
</script>
<style lang="scss" scoped></style>
