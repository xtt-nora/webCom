import { defineStore } from "pinia";
import { ErrorTypeEnum } from "@/enums/httpEnum";
import dayjs from "dayjs";

interface ErrorLogInfo {
  type: ErrorTypeEnum;
  method: "get" | "post" | "put" | "delete" | "";
  url: string;
  message: string;
  params?: string;
  data?: string;
  detail?: string;
  time?: string;
}

interface ErrorLogState {
  errorLogList: ErrorLogInfo[];
}

export const useErrorLog = defineStore({
  id: "error-log",
  state: (): ErrorLogState => ({
    errorLogList: []
  }),
  getters: {},
  actions: {
    async addErrorLog(err: ErrorLogInfo) {
      const errorInfo = {
        ...err,
        time: dayjs().format("YYYY-MM-DD HH:mm:ss")
      };

      this.errorLogList.push({ ...errorInfo });
    }
  }
});
