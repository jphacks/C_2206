import { app } from "@/firebase";
import { getFirestore } from "firebase/firestore";


const state = () => ({
  app: app,
  db: getFirestore(app),
});

const getters = {};
const actions = {

  }
const mutations = {
  setApp(state, firebase) {
    state.app = firebase;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
