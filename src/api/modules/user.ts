import request from "../../utils/request/index.ts";
export const loginApi = (data?: any) => request.post("/api/login", data, { loading: false });
// 获取菜单列表
// export const getAuthMenuListApi = () => {
//   // 如果想让菜单变为本地数据，注释上一行代码，并引入本地 authMenuList.json 数据
//   return authMenuList;
// };
// 获取菜单列表
export const getAuthMenuListApi = (id: number) => request.get(`/api/returnMenuList?id=${id}`, { loading: false });

export const getAllList = () => request.get("/user/getAllList", { loading: false });

export const searchUser = (data?: any) => request.post("/user/searchUser", data);

export const deleteUser = (data?: any) => request.post("/user/deleteUser", data);

export const createAdmin = (data: any) => request.post("/user/createAdmin", data);

export const editAdmin = (data: any) => request.post("/user/editAdmin", data);
