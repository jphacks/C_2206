import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

const state = () => ({
  user: getLoginedUser(), // TODO: 初期値nullの方がいいかもしれない
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
        commit("setUser", userCredential.user);
      })
      .catch((error) => {
        commit("error/addErrorMsg", error.message, { root: true });
        console.log(error.code + error.message);
        return error;
      });
  },
  login({ commit }, p) {
    signInWithEmailAndPassword(getAuth(), p.email, p.password)
      .then((userCredential) => {
        commit("setUser", userCredential.user);
        // dispatch("firebase/reloadUserInfo", null, { root: true }).catch((error) => {
        //   commit("error/addErrorMsg", error.message, { root: true });
        //   console.log(error.code + error.message);
        //   return error;
        // });
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
        console.log("sign out ");
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

const getLoginedUser = () => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      return user;
    } else {
      return null;
    }
  });
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
