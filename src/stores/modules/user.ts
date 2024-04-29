import { defineStore } from "pinia";
import { UserState } from "../interface";
import piniaPersistConfig from "@/stores/helper/persist";

export const useUserStore = defineStore({
  id: "user",
  state: (): UserState => ({
    token: "",
    userInfo: { name: "", imgUrl: "", id: 0 }
  }),
  getters: {
    getToken(): string {
      return this.token;
    },
    getUserInfoId(): number {
      return this.userInfo.id;
    }
  },
  actions: {
    setToken(token: string) {
      this.token = token;
    },
    setUserInfo(userInfo: UserState["userInfo"]) {
      this.userInfo = userInfo;
    }
  },
  persist: piniaPersistConfig("user")
});
