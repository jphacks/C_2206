<template>
  <div class="home">
    <div v-if="!loading">
      <v-container class="home-content">
        <!--ホーム画面のレイアウト-->
        <v-row justify="end">
          <v-btn text class="white--text" style="text-transform: none" @click="signOut">log out</v-btn>
        </v-row>
        <PopUps />
        <v-img class="cloud" v-bind="attrs" src="@/assets/cloud.png" max-height="600" max-width="800" style="align-items: center">
          <p class="grey--text text--darken1" style="display: flex; justify-content: center; align-items: center; text-align: center; margin: auto">しゅうかくまであと<br />にち</p>
        </v-img>
        <ReportGoal />
        <v-row style="height: 230px"></v-row>
        
        
        
        <PlantPlanter :goalTitle="goalTitle" />
      </v-container>

      <!-- 以下デバッグよう-->
    </div>
    <div v-else>loading...</div>
  </div>
</template>

<script>
import { v4 as uuid } from "uuid";
import { mapState } from "vuex";
import { Timestamp } from "firebase/firestore";
import PopUps from "@/components/PopUps.vue";
import PlantPlanter from "@/components/PlantPlanter.vue";
import ReportGoal from "@/components/ReportGoal.vue";
export default {
  name: "HomeView",
  components: {
    PopUps,
    PlantPlanter,
    ReportGoal,
    
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
    addrecord(goalId) {
      this.$store.dispatch("firebase/addRecord", {
        id: uuid(),
        goalId: goalId,
        createdAt: Timestamp.fromDate(new Date(2022, 10, 16, 14, 0)),
        value: {
          type: "count",
          value: 10,
        },
      });
    },
    addgoal() {
      this.$store.dispatch("firebase/addGoal", {
        id: uuid(),
        title: "読書",
        createdAt: Timestamp.fromDate(new Date()),
        startDate: Timestamp.fromDate(new Date(2022, 10 - 1, 16)),
        endDate: Timestamp.fromDate(new Date(2022, 10 - 1, 30)),
        dayGoal: {
          type: "count",
          value: 1,
        },
      });
    },
    removeGoal(id) {
      this.$store.dispatch("firebase/removeGoal", id);
    },
    removerecord(id) {
      this.$store.dispatch("firebase/removeRecord", id);
    },
    reloadUserInfo() {
      this.$store.dispatch("firebase/reloadUserInfo");
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
        if (goal["sub_title"]) {
          return goal["sub_title"];
        } else {
          return "名無しの木";
        }
      } else {
        return "名無しの木";
      }
    },
    // untilgoal() {
    //   const days = this.$store.getters["firebase/getUntilDays"]
    //   const untilgoal = (days.getTime() / 3600 / 1000/ )
    //   return untilgoal
    // }
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

.cloud{
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
