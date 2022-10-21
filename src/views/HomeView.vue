<template>
  <div class="home">
    <div v-if="!loading">
      <v-container class="home-content">
        <!--ホーム画面のレイアウト-->
        <v-row justify="end">
          <v-btn text class="white--text" style="text-transform: none" @click="signOut">log out</v-btn>
        </v-row>
        <PopUps />
        <v-img class="cloud" src="@/assets/cloud.png" max-height="600" max-width="800" style="align-items: center">
          <p class="grey--text text--darken1" style="display: flex; justify-content: center; align-items: center; text-align: center; margin: auto">しゅうかくまであと<br />にち</p>
        </v-img>
        <GoalList />
        <ReportGoal />
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
import GoalList from "@/components/GoalList.vue";
import PlantPlanter from "@/components/PlantPlanter.vue";
import ReportGoal from "@/components/ReportGoal.vue";

export default {
  name: "HomeView",
  components: {
    PopUps,
    PlantPlanter,
    ReportGoal,
    GoalList,
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
        if (goal["sub_title"]) {
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
