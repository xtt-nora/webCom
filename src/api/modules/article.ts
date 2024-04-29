import request from "../../utils/request/index.ts";
// export const setArticle = (data?: any) => request.post("/set/setArticle", data, { loading: false });
// export const getArticle = () => request.get("/set/getArticle");

//创建文章
export const createArticle = (data?: any) => request.post("/article/createArticle", data, { loading: true });

//获取所有文章
export const allArticle = () => request.get("/article/allArticle");
