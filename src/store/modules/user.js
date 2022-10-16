import { useUser } from "@/firebase";
import { getAuth } from "firebase/auth";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

const state = () => ({
  user: getAuth().currentUser, // TODO: 初期値nullの方がいいかもしれない
});

const getters = {
  getUser({ state }) {
    return state.user
  },
};
const actions = {
  reloadUser({commit}){
    useUser((user)=>{
      commit("setUser", user)
    })
  },
  signIn({ commit, dispatch }, p) {
    createUserWithEmailAndPassword(getAuth(), p.email, p.password)
      .then((userCredential) => {
        commit("setUser", userCredential.user);
        dispatch("firebase/reloadUserInfo", null, { root: true }).catch((error) => {
          commit("error/addErrorMsg", error.message, { root: true });
          console.log(error.code + error.message);
          return error;
        });
      })
      .catch((error) => {
        commit("error/addErrorMsg", error.message, { root: true });
        console.log(error.code + error.message);
        return error;
      });
  },
  login({ commit, dispatch }, p) {
    signInWithEmailAndPassword(getAuth(), p.email, p.password)
      .then((userCredential) => {
        commit("setUser", userCredential.user);
        dispatch("firebase/reloadUserInfo", null, { root: true }).catch((error) => {
          commit("error/addErrorMsg", error.message, { root: true });
          console.log(error.code + error.message);
          return error;
        });
      })
      .catch((error) => {
        commit("error/addErrorMsg", error.message, { root: true });
        console.log(error.code + error.message);
        return error;
      });
  },
  signOut({ commit }) {
    signOut(getAuth())
      .then(() => {
        commit("setUser", null);
      })
      .catch((error) => {
        commit("error/addErrorMsg", error.message, { root: true });
        console.log(error.code + error.message);
        return error;
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
