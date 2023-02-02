import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import OutflowsView from "../views/OutflowsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: '/outflows',
      name: 'outflows',
      component: OutflowsView
    }
  ],
});

export default router;
