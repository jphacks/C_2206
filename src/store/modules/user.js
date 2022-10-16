import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createUserWithEmailAndPassword, signUpWithEmailAndPassword, signOut } from "firebase/auth";

const state = () => ({
  user: getLoginedUser(), // TODO: 初期値nullの方がいいかもしれない
});

const getters = {
  getUser({ state }) {
    state.user = getAuth().currentUser;
  },
};
const actions = {
  signUp({ commit }, p) {
    createUserWithEmailAndPassword(getAuth(), p.email, p.password)
      .then((userCredential) => {
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
    signUpWithEmailAndPassword(getAuth(), p.email, p.password)
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
  signOut({ commit }) {
    signOut(getAuth())
      .then(() => {
        console.log("sign out ");
        commit("setUser", null);
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
