<template>
  <v-container class="home-content">
    <!--ホーム画面のレイアウト-->
    <v-row justify="end">
      <v-btn text class="white--text" style="text-transform: none" @click="signout">log out</v-btn>
    </v-row>
    <v-row style="height: 40px"></v-row>
    <v-row justify="center" align-content="center" class="grey lighten-1 white--text mt-16 mx-16" style="height: 70px">
      <!--PopUp.vueで設定した期間から残りの時間を導いてuntilgoalに代入-->
      <div>しゅうかくまであと{{ untilgoal }}にち</div>
    </v-row>
    <v-row style="height: 150px"></v-row>
    <v-row class="brown lighten-1 white--text mt-16" style="height: 270px"> </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import { serverTimestamp, Timestamp } from "firebase/firestore";

export default {
  name: "HomeScreen",
  data: () => ({
    dialog: false,
    hours: undefined,
    minutes: undefined,
    times: undefined,
    did: undefined,
    LongOrMany: undefined,
    untilgoal: 3,
    saveError: false,
  }),
  methods: {
    signout() {
      this.$store.dispatch("user/signOut");
    },
    closeDialog() {
      this.dialog = false;
    },
    makeGoal() {
      let value = undefined;
      let type = undefined;

      if (this.LongOrMany === "時間") {
        type = "timestamp";
        value = Timestamp.fromDate(new Date((this.hours * 3600 + this.minutes * 60) * 1000));
      } else if (this.LongOrMany === "回数") {
        type = "count";
        value = this.times;
      }

      if ((this.hours !== undefined && this.minutes !== undefined) || this.times !== undefined) {
        const data = {
          //id: uuid(),
          //goalId: uuid,
          createdAt: serverTimestamp(),
          dayResult: {
            type: type,
            value: value,
          },
        };
        this.saveError = false;
        this.$store.dispatch("firebase/addGoal", data);
        this.dialog = false;
      } else {
        this.saveError = true;
      }
    },
  },

  computed: {
    ...mapState(["user"]),

    HowLong() {
      return this.LongOrMany === "時間";
    },
    HowMany() {
      return this.LongOrMany === "回数";
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
