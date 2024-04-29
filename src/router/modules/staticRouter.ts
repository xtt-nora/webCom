import { RouteRecordRaw } from "vue-router";
import { HOME_URL, LOGIN_URL } from "@/config";

/**
 * 静态路由
 */
export const staticRouter: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: HOME_URL
  },
  {
    path: LOGIN_URL,
    name: "login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: "登录"
    }
  },
  {
    path: "/layout",
    name: "layout",
    component: () => import("@/layouts/index.vue"),
    // component: () => import("@/layouts/indexAsync.vue"),
    redirect: HOME_URL,
    // children: [
    //   {
    //     path: "/home",
    //     name: "home",
    //     meta: {
    //       icon: "HomeFilled",
    //       title: "欢迎使用",
    //       isLink: "",
    //       isHide: false,
    //       isFull: false,
    //       isAffix: true,
    //       isKeepAlive: true
    //     },
    //     component: () => import("@/views/home/index.vue")
    //   },
    //   {
    //     path: "/article",
    //     name: "article",
    //     meta: {
    //       icon: "HomeFilled",
    //       title: "文章",
    //       isLink: "",
    //       isHide: false,
    //       isFull: false,
    //       isAffix: true,
    //       isKeepAlive: true
    //     },
    //     component: () => import("@/views/article/index.vue")
    //   },
    //   {
    //     path: "/software",
    //     name: "software",
    //     meta: {
    //       icon: "HomeFilled",
    //       title: "软件",
    //       isLink: "",
    //       isHide: false,
    //       isFull: false,
    //       isAffix: true,
    //       isKeepAlive: true
    //     },
    //     component: () => import("@/views/software/index.vue")
    //   }
    // ]
    children: [
      {
        path: "/write",
        name: "write",
        meta: {
          icon: "write",
          title: "写文章",
          isLink: "",
          isHide: false,
          isFull: false,
          isAffix: true,
          isKeepAlive: true
        },
        component: () => import("@/views/write/index.vue")
      },
      {
        path: "/collect",
        name: "collect",
        meta: {
          icon: "collect",
          title: "写文章",
          isLink: "",
          isHide: false,
          isFull: false,
          isAffix: true,
          isKeepAlive: true
        },
        component: () => import("@/views/collect/index.vue")
      }
    ]
  }
];

/**
 * errorRouter (错误页面路由)
 */
export const errorRouter = [
  {
    path: "/403",
    name: "403",
    component: () => import("@/components/ErrorMessage/403.vue"),
    meta: {
      title: "403页面"
    }
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/components/ErrorMessage/404.vue"),
    meta: {
      title: "404页面"
    }
  },
  {
    path: "/500",
    name: "500",
    component: () => import("@/components/ErrorMessage/500.vue"),
    meta: {
      title: "500页面"
    }
  },
  // Resolve refresh page, route warnings
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/components/ErrorMessage/404.vue")
  }
];
