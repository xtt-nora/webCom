import type { Component } from "vue";
import preloaderSpin from "@/components/base-loading/spin/preloaderSpin.vue";
import chaseSpin from "@/components/base-loading/spin/chaseSpin.vue";
export enum LoadingEnum {
  PRELOADER = "preloader",
  CHASE = "chase",
  //   DOT = "dot",
  LOADING = "loading"
}

const loadingMap = new Map<LoadingEnum, Component>();

loadingMap.set(LoadingEnum.PRELOADER, preloaderSpin);
loadingMap.set(LoadingEnum.CHASE, chaseSpin);
export { loadingMap };
