import { defineStore } from "pinia";
import { GlobalState } from "../interface";
import piniaPersistConfig from "../helper/persist";

export const useGlobalStore = defineStore({
  id: "vpn-global",
  state: (): GlobalState => ({
    layout: "classic",
    search: ""
  }),
  getters: {},
  actions: {},
  persist: piniaPersistConfig("vpn-global")
});
