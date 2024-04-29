import request from "../../utils/request/index.ts";

//获取所有软件
export const fileFileList = () => request.get("/file/fileFileList");
