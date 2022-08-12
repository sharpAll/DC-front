import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";
import Layout from "/@/components/Layout.vue";
import Home from "/@/views/home/index.vue";
import Login from "/@/views/login/index.vue";
import Redirect from "/@/views/redirect/index.vue";
import Kline from "/@/views/kline/index.vue";

export const RedirectRoute = {
  path: "/redirect",
  name: "Redirect",
  component: Layout,
  meta: {
    title: "Redirect",
    hideBreadcrumb: true,
  },
  children: [
    {
      path: "/redirect/:path(.*)",
      name: "Redirect",
      component: Redirect,
      meta: {
        title: "Redirect",
        hideBreadcrumb: true,
        isCached: false,
      },
    },
  ],
};

const routes = [
  RedirectRoute,
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/",
    name: "Layout",
    component: Layout,
    children: [
      {
        path: "/home",
        name: "Home",
        meta: {
          title: "首页",
          affix: true,
        },
        component: Home,
      },
      {
        path: "/kline",
        name: "Kline",
        meta: {
          title: "K线图",
        },
        component: Kline,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
