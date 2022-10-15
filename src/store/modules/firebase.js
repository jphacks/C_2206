import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";

import { db, app } from "@/firebase";

const state = () => ({
  app: app,
  userInfo: initUserInfo(),
});

const getters = {
  getUserInfo(state) {
    return state.userInfo;
  },
};
const actions = {
  // ユーザーの情報をfirebaseから再読み込みする
  reloadUserInfo({ commit }) {
    commit("setUserInfo", initUserInfo());
  },
  // 最終目標を追加する
  addGoal({ commit, state }, goal) {
    console.log("addGoal");
    const userInfo = state.userInfo;
    if (!userInfo) {
      throw new Error("state.userInfo is " + typeof userInfo);
    }
    console.log("addGoal2");
    const goalRef = doc(db, "users", state.userInfo.uid);
    updateDoc(goalRef, {
      goal: arrayUnion({ ...goal }),
    })
      .then(async () => {
        console.log("addGoal3");
        const userInfo = await getDoc(doc(db, "users", state.userInfo.uid));
        commit("setUserInfo", userInfo);
      })
      .error((error) => {
        commit("error/addErrorMsg", error.message, { root: true });
        console.log(error.code + error.message);
        return error;
      });
  },
};
const mutations = {
  // ユーザー情報を登録する
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo;
  },
};

// functions
const initUserInfo = () => {
  const auth = getAuth();
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const docSnap = await getDoc(doc(db, "users", user.uid));
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        await setDoc(doc(db, "users", user.uid), {
          userName: user.displayName,
          goal: [],
          records: [],
          recordSummary: {
            achevement: 0,
          },
        });
        const docSnap = await getDoc(doc(db, "users", user.uid));
        return docSnap.data();
      }
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
