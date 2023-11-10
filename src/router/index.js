import { createRouter, createWebHashHistory } from "vue-router";

export const routes = [
  {
    path: "/",
    name: "root",
    component: () => import("../components/MainMap.vue"),
  },
];
// 创建路由
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// 路由变化了之后刷新页面
router.afterEach((to, from) => {
  if (from.name) {
    location.reload();
  }
});

export default router;
