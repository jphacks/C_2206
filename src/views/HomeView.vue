<template>
  <div class="home">
    <div v-if="!loading">
      <v-container class="home-content">
        <!--ホーム画面のレイアウト-->
        <v-row justify="end">
          <v-btn text class="white--text" style="text-transform: none" @click="signOut">log out</v-btn>
        </v-row>
        <PopUps />

        <realGoalList :goalList="goalList" />

        <v-img class="cloud" src="@/assets/cloud.png" max-height="600" max-width="800" style="align-items: center">
          <p class="grey--text text--darken1" style="display: flex; justify-content: center; align-items: center; text-align: center; margin: auto">しゅうかくまで<br />あと{{ untilgoal }}にち</p>
        </v-img>

        <ReportGoal/>
        <RecordList :recordList="recordList" />

        <v-row style="height: 230px"></v-row>

        <PlantPlanter :goalTitle="goalTitle" />
      </v-container>
    </div>
    <div v-else>loading...</div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import PopUps from "@/components/PopUps.vue";
import RecordList from "@/components/RecordList.vue";
import PlantPlanter from "@/components/PlantPlanter.vue";
import ReportGoal from "@/components/ReportGoal.vue";
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


export default {
  name: "HomeView",
  components: {
    PopUps,
    PlantPlanter,
    ReportGoal,
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
  },
};
</script>

<style>
.home-content {
  background-color: rgb(202, 225, 234);
  width: 100%;
  height: 100vh;
}

.close {
  margin-right: -15px;
}

.cloud {
  margin-top: -130px;
  margin-left: -10px;
}

.cursive {
  font-family: cursive;
}

.soil {
  background: rgb(166, 137, 113);
  height: 200px;
  width: 200px;
}

.ellipse {
  width: 200px;
  height: 100px;
  background: rgb(255, 255, 255);
  margin-top: 100px;
  margin-left: 110px;
  margin-right: 110px;
  -moz-border-radius: 100px / 50px;
  -webkit-border-radius: 100px / 50px;
  border-radius: 100px / 50px;
}

.watering {
  margin-left: 50px;
  margin-top: 25px;
  color: black;
  font-size: xx-large;
  font-weight: bold;
}
</style>
