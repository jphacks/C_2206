import { getAuth } from "firebase/auth";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const state = () => ({
  user: null,
});

const getters = {
  getUser({ state }) {
    state.user = getAuth().currentUser;
  },
};
const actions = {
  signIn({ commit }, p) {
    createUserWithEmailAndPassword(getAuth(), p.email, p.password)
      .then((userCredential) => {
        console.log("signined" + userCredential);
        commit("setUser", userCredential.user);
      })
      .catch((error) => {
        console.log("error occured");
        const errorCode = error.code;
        const errorMessage = error.message;
        commit("error/addErrorMsg", errorMessage, { root: true });
        console.log(errorCode + errorMessage);
        return errorCode, errorMessage;
      });
  },
  login({ commit }, p) {
    signInWithEmailAndPassword(getAuth(), p.email, p.password)
      .then((userCredential) => {
        commit("setUser", userCredential.user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        commit("error/addErrorMsg", errorMessage, { root: true });
        console.log(errorCode + errorMessage);
        return errorCode, errorMessage;
      });
  },
};
const mutations = {
  setUser(state, user) {
    state.user = user;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
