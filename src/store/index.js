import Vuex from 'vuex'
import firebase from './modules/firebase';
import user from './modules/user';
import error from './modules/error'
import Vue from 'vue'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    error,
    firebase,
    user,
  },
});

export default store