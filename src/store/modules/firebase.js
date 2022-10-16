import { doc, setDoc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";

import { db, app, useUser } from "@/firebase";
const state = () => ({
  app: app,
  userInfo: null,
});

const getters = {
  getUserInfo(state) {
    return state.userInfo;
  },
};
const actions = {
  // ユーザーの情報をfirebaseから再読み込みする
  async reloadUserInfo({ commit }) {
    useUser((user) => {
      syncUserInfo(user).then((userinfo) => {
        commit("setUserInfo", userinfo);
      });
    });
  },
  // 最終目標を追加する
  async addGoal({ commit }, goal) {
    useUser(async (user) => {
      const userDoc = doc(db, "users", user.uid);
      await updateDoc(userDoc, {
        goal: arrayUnion({ ...goal }),
      });
      await getDoc(userDoc).then((userInfo) => {
        commit("setUserInfo", userInfo.data());
      });
    });
  },
  // ある最終目標を削除する
  async removeGoal({ commit }, removeId) {
    useUser(async (user) => {
      const userDoc = doc(db, "users", user.uid);
      let userInfo = await (await getDoc(userDoc)).data();
      if (userInfo.goal) {
        const goals = userInfo.goal.filter((goal) => (goal.id != removeId));
        await updateDoc(userDoc, {
          goal: [...goals],
        });
      }
      await getDoc(userDoc).then((userInfo) => {
        commit("setUserInfo", userInfo.data());
      });
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
const syncUserInfo = async (user) => {
  if (!user) return null;
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
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
