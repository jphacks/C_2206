<template>
  <div class="home">

    <div v-if="!loading">
      <v-container>
        <PopUps />
            <HomeScreen />
      </v-container>
      <v-container>
        <PlantPlanter :goalTitle="goalTitle" />
      </v-container>
      <v-btn @click="reloadUserInfo">reload</v-btn>
      <v-btn @click="signOut">sign out</v-btn>
      <v-btn @click="addgoal">add goal</v-btn>
      <div v-if="firebase.userInfo">
        <div v-for="goal in firebase.userInfo.goals" :key="goal.id">
          <p>{{ goal.id }}</p>
          <p>{{ goal.title }}</p>
          <p>{{ goal.createdAt.toDate() }}</p>
          <v-btn @click="addrecord(goal.id)">add record</v-btn>
          <v-btn @click="removeGoal(goal.id)">remove</v-btn>
          <div v-for="summary in goal.recordSummary" :key="summary.goalId">
            <p>{{ summary.achevement }}</p>
            <p>{{ summary.recordSum }}</p>
          </div>
          <div v-for="record in firebase.userInfo.records" :key="record.id">
            <div v-if="record.goalId == goal.id">
              <p>{{ record.id }}</p>
              <p>{{ record.createdAt.toDate() }}</p>
              <v-btn @click="removerecord(record.id)">remove</v-btn>
            </div>

          </div>
        </div>
      </div>
    </div>
    <div v-else>loading...</div>
  </div>
</template>

<script>
import { v4 as uuid } from "uuid";
import { mapState } from "vuex";
import { Timestamp } from "firebase/firestore";
import HomeScreen from "@/components/HomeScreen.vue";
import PopUps from "@/components/PopUps.vue";
import PlantPlanter from "@/components/PlantPlanter.vue";
export default {
  name: "HomeView",
  components: {
    PopUps,
    HomeScreen,
    PlantPlanter,
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
  },
};
</script>
