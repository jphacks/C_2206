import Vue from "vue";
import VueRouter from "vue-router";

import HomeView from "@/views/HomeView";
import AboutView from "@/views/AboutView";
import TopView from "@/views/TopView";

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",

    component: AboutView,
  },
  {
    path: "/",
    name: "top",
    component: TopView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
