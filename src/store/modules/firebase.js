import { doc, setDoc, getDoc, updateDoc, arrayUnion, serverTimestamp } from "firebase/firestore";

import { db, app, useUser } from "@/firebase";
const state = () => ({
  app: app,
  userInfo: null,
});

const getters = {
  getUserInfo: (state) => {
    return state.userInfo;
  },
  getGoals: (state) => {
    if (state.userInfo) {
      if (state.userInfo.goals) {
        return state.userInfo.goals;
      } else return state.userInfo.goals;
    } else return undefined;
  },
  getOneGoal: (state) => (id) => {
    if (state.userInfo && state.userInfo.goals) {
      const goals = state.userInfo.goals;
      if (id && goals.length > 0) {
        const goal = goals.filter((goal) => goal.id == id)[0];
        if (goal) {
          return goal;
        }
      }
    }
    return undefined;
  },
  getUntilDays: (state) => (id) => {
    if (state.userInfo && state.userInfo.goals) {
      const goal = state.userInfo.goals.filter((goal) => goal.id == id)[0];
      if (goal) return new Date(goal.endDate.toDate().getTime() - new Date().getTime());
    }
  },
  getRecordsByGoalId: (state) => (goalid)=>{
    if (state.userInfo && state.userInfo.records) {
      return state.userInfo.records.filter((record) => {if(record.goalId == goalid){
        return record
      }});
    }
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
        goals: arrayUnion({ ...goal }),
      });
      await getDoc(userDoc).then((userInfo) => {
        commit("setUserInfo", userInfo.data());
      });
    });
    commit("user/setCurrentGoalId", goal.id, { root: true });
  },
  // ある最終目標を削除する
  async removeGoal({ commit }, removeId) {
    useUser(async (user) => {
      const userDoc = doc(db, "users", user.uid);
      let userInfo = await (await getDoc(userDoc)).data();
      if (userInfo.goals) {
        const goals = userInfo.goals.filter((goal) => goal.id != removeId);
        await updateDoc(userDoc, {
          goals: [...goals],
        });
      }
      await getDoc(userDoc).then((userInfo) => {
        commit("setUserInfo", userInfo.data());
      });
    });
  },
  // 記録を追加する
  async addRecord({ commit }, record) {
    useUser(async (user) => {
      const userDoc = doc(db, "users", user.uid);
      await getDoc(userDoc).then(async (data) => {
        let userInfo = data.data();
        if (userInfo.records) {
          if (userInfo.records.length > 0) {
            userInfo.records = userInfo.records.concat([record]);
          } else {
            userInfo.records = [record];
          }
        }
        await updateDoc(userDoc, {
          records: arrayUnion({ ...record }),
          createdAt: serverTimestamp(),
          recordSummary: userInfo.records ? updateRecordSummary(userInfo) : [],
        });
      });
      await getDoc(userDoc).then((userInfo) => {
        commit("setUserInfo", userInfo.data());
      });
    });
  },
  // ある記録を削除する
  async removeRecord({ commit }, removeId) {
    useUser(async (user) => {
      const userDoc = doc(db, "users", user.uid);
      let userInfo = await (await getDoc(userDoc)).data();
      if (userInfo.records) {
        const records = userInfo.records.filter((record) => record.id != removeId);
        await updateDoc(userDoc, {
          records: [...records],
          recordSummary: updateRecordSummary(userInfo),
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
      goals: [],
      records: [],
      recordSummary: [
        {
          achevement: 0,
        },
      ],
    });
    const docSnap = await getDoc(doc(db, "users", user.uid));
    return docSnap.data();
  }
};

const updateRecordSummary = (userInfo) => {
  const goals = userInfo.goals;
  const records = userInfo.records;
  return goals.map((goal) => {
    const { sum, achevement } = calcRecordSum(records, goal);
    return {
      goalId: goal.id,
      achevement: achevement,
      recordSum: {
        type: goal.dayGoal.type,
        value: sum,
      },
    };
  });
};

const calcRecordSum = (originalRecords, goal) => {
  const records = originalRecords.filter((r) => r.goalId == goal.id);
  const type = goal.dayGoal.type;
  /**
   * 目標を開始してから今日までの期間(単位：日)
   * @type(number)
   */
  const daysUntilToday = Math.floor((Date.now() - goal.startDate.toMillis()) / 1000 / 3600 / 24);
  /**
   * 目標に設定した継続期間(単位：日)
   * @type(number)
   */
  const period = Math.floor((goal.endDate.toDate().getTime() - goal.startDate.toDate().getTime()) / 1000 / 3600 / 24);
  if (type == "timestamp") {
    /**
     *記録の合計の目標です(単位：ミリ秒)
     *@type (number)
     */
    const goalRecordSum = Math.floor(period * goal.dayGoal.value.toDate().getTime());
    /**
     * 今までの記録の合計です(ミリ秒)
     *@type (number)
     */
    const sum = records
      .reduce((sum, r) => {
        if (r.value.type == "timestamp") {
          const time = r.value.value.toDate();
          return new Date(sum.getTime() + time.getTime());
        }
      }, new Date(0))
      .getTime();
    /**
     * 現時点での目標の達成度です。単位はパーセント。別名しなしな度
     * （合計/日数）＊今日までの日数 と今日までの記録の合計の比で算出する
     * @type(number)
     */
    const calcAchevement = () => {
      if (daysUntilToday == 0 || goalRecordSum == 0 || period == 0) return 0;
      return Math.floor((sum / ((goalRecordSum / period) * daysUntilToday)) * 100);
    };
    const achevement = calcAchevement();
    return { sum, achevement };
  } else if (type == "count" || type == "bool") {
    if (goal.dayGoal.value.type == "timestamp") {
      throw "Invalid record type";
    }
    const goalRecordSum = period * goal.dayGoal.value;
    const sum = records.reduce((sum, r) => {
      return sum + r.value.value;
    }, 0);
    const achevement = Math.floor((sum / ((goalRecordSum / period) * daysUntilToday)) * 100);
    return { sum, achevement };
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
