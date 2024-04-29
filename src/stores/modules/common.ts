import { defineStore } from "pinia";
import { CommonState } from "../interface/modules/common";

export const useCommonState = defineStore({
  id: "vpn-common",
  state: (): CommonState => ({
    commonData: {} //存储数据
  }),
  getters: {
    getCommon(): {} {
      return this.commonData;
    }
  },
  actions: {
    setCommon(data: {}) {
      this.commonData = data;
    }
  }
});
