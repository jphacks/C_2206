import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import store from "./store/";
import router from "./router";

Vue.config.productionTip = false;
Vue.prototype.$store = store;

new Vue({
  vuetify,
  Vuex,
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
