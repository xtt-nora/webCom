import request from "../../utils/request/index.ts";
import { Upload } from "@/api/interface/index";
import { ContentTypeEnum } from "@/enums/httpEnum";

export const uploadImg = data => {
  return request.post("/file/uploadImage", data, {
    config: {
      headers: { "Content-Type": ContentTypeEnum.FORM_DATA }
    }
  });
};

// // 视频上传
export const uploadVideo = (params: FormData) => request.post<Upload.ResFileUrl>("/V1/upload/video", params);
