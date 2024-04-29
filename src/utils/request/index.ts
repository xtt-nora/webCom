import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { ResultEnum, ContentTypeEnum } from "@/enums/httpEnum";
import { AxiosLoading } from "./loading";
import { useUserStore } from "@/stores/modules/user";
export interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  loading?: boolean;
}
interface axiosConfig {
  successMessage?: boolean;
  errorMessage?: boolean;
  cancelSame?: boolean;
  retryCount?: number;
  isRetry?: boolean;
  loading?: boolean;
}

const defaultConfig: axiosConfig = {
  successMessage: false,
  errorMessage: true,
  cancelSame: false,
  isRetry: false,
  retryCount: 3,
  loading: true
};
const axiosLoading = new AxiosLoading();
const service: AxiosInstance = axios.create({
  // 默认地址请求地址，可在 .env.** 文件中修改
  baseURL: import.meta.env.VITE_API_URL as string,
  // 设置超时时间
  timeout: ResultEnum.TIMEOUT as number,
  // 跨域时候允许携带凭证
  withCredentials: true,
  headers: { "Content-Type": ContentTypeEnum.JSON }
});

//请求拦截器
//AxiosRequestConfig报错；AxiosRequestConfig和InternalAxiosRequestConfig是父子类关系，但是父类没有子类的，所以用子类
// service.interceptors.request.use((config: any) => {
//   const userStore = useUserStore();
//   // const { getToken } = userStore;
//   const { loading } = config.requestOptions;
//   if (config.headers) {
//     config.headers.Authorization = unref(`${userStore.token}`) ?? "";
//   }
//   if (loading) {
//     axiosLoading.addLoading();
//   }
//   console.log(config);
//   return config;
// });
service.interceptors.request.use((config: any) => {
  const userStore = useUserStore();
  const { loading } = config;
  if (config.headers) {
    config.headers.Authorization = `${userStore.token}` ?? "";
    if (config.requestOptions && config.requestOptions.config && config.requestOptions.config.headers) {
      config.headers = { ...config.headers, ...config.requestOptions.config.headers };
    }
  }
  if (loading) {
    axiosLoading.addLoading();
  }
  return config;
});

//响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    // const data = response.data;
    return response;
  },
  err => {
    if (err.code === "ERR_CANCELED") return;
    return Promise.reject(err.response);
  }
);

//请求封装
const request = {
  get<T = any>(url: string, data?: any, config?: axiosConfig): Promise<T> {
    return request.request("GET", url, { params: data }, config);
  },
  post<T = any>(url: string, data?: any, config?: {}): Promise<T> {
    return request.request("POST", url, { data }, config);
  },
  put<T = any>(url: string, data?: any, config?: axiosConfig): Promise<T> {
    return request.request("PUT", url, { data }, config);
  },
  delete<T = any>(url: string, data?: any, config?: axiosConfig): Promise<T> {
    return request.request("DELETE", url, { params: data }, config);
  },
  request<T = any>(method = "GET", url: string, data?: any, config?: axiosConfig): Promise<T> {
    const options = Object.assign({}, defaultConfig, config);
    return new Promise((resolve, reject) => {
      service({ method, url, ...data, requestOptions: options })
        .then(res => {
          resolve(res as unknown as Promise<T>);
        })
        .catch((e: Error | AxiosError) => {
          reject(e);
        })
        .finally(() => {
          if (options.loading) {
            axiosLoading.closeLoading();
          }
        });
    });
  }
};
export default request;
