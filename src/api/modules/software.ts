import request from "../../utils/request/index.ts";
import { ContentTypeEnum } from "@/enums/httpEnum";
export const createSoftware = data =>
  request.post("/software/createSoftware", data, {
    config: {
      headers: { "Content-Type": ContentTypeEnum.FORM_DATA }
    }
  });

export const softwareList = () => request.get("/software/softwareList");
export const deleteSoftware = data => request.post("/software/deleteSoftware", data);

// 更新下载量
export const updateDownload = data => request.post("/file/updateDownload", data);
