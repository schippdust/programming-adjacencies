import { createRouter, createWebHistory } from "vue-router";
import BuildProgramView from "../views/BuildProgramView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "build-program",
      component: BuildProgramView,
    },
    {
      path: "/adjacency",
      name: "adjacency",
      component: () => import("../views/AdjacencyView.vue"),
    },
  ],
});

export default router;
