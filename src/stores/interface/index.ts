// 属性较少可直接写入；否则重新命名写ts文件
export type LayoutType = "classic";
export interface GlobalState {
  layout: LayoutType;
  search: string;
}
/* KeepAliveState */
export interface KeepAliveState {
  keepAliveName: string[];
}

/**
 * 用户信息
 */
export interface UserState {
  token: string;
  userInfo: { name: string; imgUrl: string; id: number };
}

export interface LoginParams {
  account: string;
  password: string;
}
