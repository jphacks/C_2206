import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import SignUpView from "../views/SignUpView.vue";
import TopView from "../views/TopView.vue";
import AboutView from "@/views/AboutView";
import NotfoundView from "../views/NotfoundView.vue";
import store from "@/store/index.js";
import { useUser } from "@/firebase.js";
Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "home",
    component: HomeView,
    meta: { requiresAuth: true },
  },
  {
    path: "/signup",
    name: "signup",
    component: SignUpView,
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
  {
    name: "notFound",
    path: "*",
    component: NotfoundView,
    meta: { title: "お探しのページは見つかりませんでした" },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// ページ遷移する時はエラーメッセージを消すようにする
router.beforeEach(function (to, from, next) {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  if (requiresAuth) {
    useUser(
      () => {
        next();
      },
      () => {
        next({ name: "top" });
      }
    );
  }
  store.commit("error/delErrorMsg");
  next();
});

export default router;
