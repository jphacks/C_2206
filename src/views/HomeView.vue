<template>
  <div class="home">
    <div v-if="!loading">
      <v-container class="home-content">
        <!--ホーム画面のレイアウト-->
        <v-row justify="end">
          <v-btn text class="one white--text" style="text-transform: none" @click="signOut">log out</v-btn>
        </v-row>
        <realGoalList class="one" :goalList="goalList" />
        <RecordList class="one" :recordList="recordList"/>
        <PopUps class="two"/>
        <v-img class="three cloud" src="@/assets/cloud.png" max-height="600" max-width="800" style="align-items: center">
          <p class="grey--text text--darken-6" style="display: flex; justify-content: center; align-items: center; text-align: center; margin: auto">しゅうかくまで<br />あと{{ untilgoal }}にち</p>
        </v-img>
        <ReportGoal class="three"/>
        
        <ipponMovement class="one"  v-if="rawIpponName" :rawIpponName="rawIpponName"/>
        <PlantPlanter :goalTitle="goalTitle" :achevement="achevement" :dayRate="dayRate" />

      </v-container>
    </div>
    <div v-else>
      <div class="bg">
        <v-container>
          <v-row class="mx-auto mt-11" justify="center">
            <v-progress-circular :size="80" :width="7" color="green" indeterminate></v-progress-circular>
          </v-row>
          <v-row class="mt-6" align-content="center" justify="center">
            <h3 text-align="center">ちょっとまってね。。。</h3>
          </v-row>
          <div class="mt-14 ippon">
            <img src="../assets/loading.png" />
          </div>
        </v-container>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import PopUps from "@/components/PopUps.vue";
import RecordList from "@/components/RecordList.vue";
import PlantPlanter from "@/components/PlantPlanter.vue";
import ReportGoal from "@/components/ReportGoal.vue";
import ipponMovement from "@/components/ipponMovement.vue";
import realGoalList from "@/components/realGoalList.vue";

const getDate = (date) => {
  const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
  return `${year}/${month}/${day}`;
};

const getHourMinuteStr = (date) => {
  const minutes = Math.floor(date.getTime() / 1000 / 60);
  const hour = Math.floor(minutes / 60);
  const minute = minutes % 60;
  return `${hour}時間${minute}分`;
};

const title2ipponName = {
  べんきょう: "study",
  うんどう: "sport",
  どくしょ: "reading",
  がいこくご: "language",
  おんがく: "music",
  はやおき: "getup",
  えをかく: "art",
};

export default {
  name: "HomeView",
  components: {
    PopUps,
    PlantPlanter,
    ReportGoal,
    ipponMovement,
    realGoalList,
    RecordList,
  },
  data: () => {
    return {
      loading: true,
    };
  },
  beforeCreate: function () {
    this.$store.dispatch("firebase/reloadUserInfo").then(() => {
      const goals = this.$store.getters["firebase/getGoals"];
      if (goals) this.$store.commit("user/setCurrentGoalId", goals.slice(-1)[0].id);
      this.loading = false;
    });
  },
  methods: {
    signOut() {
      this.$store.dispatch("user/signOut").then(() => {
        this.$router.push({ name: "top" });
      });
    },
  },
  computed: {
    ...mapState(["firebase"]),
    currentGoalId() {
      return this.$store.getters["user/getCurrentGoalId"];
    },
    goalTitle() {
      const goals = this.$store.getters["firebase/getGoals"];
      // const currentGoalId = this.$store.getters["user/getCurrentGoalId"];
      if (this.currentGoalId && goals.length > 0) {
        const goal = goals.filter((goal) => goal.id == this.currentGoalId)[0];
        if (goal && goal["sub_title"]) {
          return goal["sub_title"];
        } else {
          return "名無しの木";
        }
      } else {
        return "名無しの木";
      }
    },
    untilgoal() {
      const days = this.$store.getters["firebase/getUntilDays"](this.currentGoalId);
      if (!days) return undefined;
      const untilgoal = Math.floor(days.getTime() / 3600 / 1000 / 24);
      return untilgoal;
    },
    goalList() {
      const goals = this.$store.getters["firebase/getGoals"];
      if (goals && goals.length > 0) {
        return goals.map((goal) => {
          return {
            id: goal.id,
            title: goal.title,
            sub_title: goal.sub_title,
            start: getDate(goal.startDate.toDate()),
            goal: getDate(goal.endDate.toDate()),
          };
        });
      } else return undefined;
    },
    recordList() {
      const rawRecords = this.$store.getters["firebase/getRecordsByGoalId"](this.currentGoalId);
      return rawRecords.map((r) => {
        if (r.value.type == "timestamp") {
          return {
            date: getDate(r.createdAt.toDate()),
            value: getHourMinuteStr(r.value.value.toDate()),
          };
        } else {
          return {
            date: getDate(r.createdAt.toDate()),
            value: r.value.value,
          };
        }
      });
    },
    achevement() {
      return this.$store.getters["firebase/getAchevemetntById"](this.currentGoalId);
    },
    dayRate() {
      return this.$store.getters["firebase/getDayRate"](this.currentGoalId);
    },
    rawIpponName() {
      if (this.untilgoal <= 0) {
        const goal = this.$store.getters["firebase/getOneGoal"](this.currentGoalId);
        console.log(goal.title)
        console.log(title2ipponName[goal.title])
        if (goal && goal.title) {
          return title2ipponName[goal.title];
        }
      }
      return undefined;
    },
  },
};
</script>

<style>
.bg {
  width: 100%;
  height: 100vh;
  background-image: url("../assets/background.png");
}

.home-content {
  background-color: rgb(202, 225, 234);
  width: 100%;
  height: 100vh;
}

.one{
  z-index: 30;
  position: relative;
}

.two{
  z-index: 20;
  position: relative;
}

.three{
  z-index: 10;
  position: relative;
}

.cloud {
  margin-top: -130px;
  margin-left: -10px;
}

.v-progress-circular {
  margin: 1rem;
}

.ippon {
  text-align: center;
}

.ippon img {
  width: 65%;
  height: auto;
}
</style>
