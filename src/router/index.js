import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import SignUpView from "../views/SignUpView.vue";
import TopView from "../views/TopView.vue";
import AboutView from "@/views/AboutView";
import store from "@/store/index.js"

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "home",
    component: HomeView,
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
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// ページ遷移する時はエラーメッセージを消すようにする
router.beforeEach(function(to, from, next){
  store.commit("error/delErrorMsg")
  next()
})

export default router;
