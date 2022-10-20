<template>
  <v-container class="">
    <!--結果報告ポップアップ-->
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on"> 水をやる </v-btn>
      </template>
      <v-card>
        <v-container class="green darken-1 white--text">
          <v-row class="pl-3">
            <v-btn icon absolute right justify-content="space-between" class="cursive close" @click="closeDialog">
              <v-icon color="white">mdi-close</v-icon>
            </v-btn>
            <v-col class="text-h4 pt-5 pl-8">けっかほうこく</v-col>
          </v-row>
        </v-container>

        <v-col cols="12" sm="6">
          <v-col>
            <!--時間を選んだ場合-->
            <div v-if="HowLong">
              <p class="brown--text text--darken-4 text-h6 pl-13">どのくらいやった？</p>

              <v-row>
                <v-col cols="3">
                  <v-text-field dense color="brown darken-4" v-model.number="hours" label="数字(半角)"> </v-text-field>
                </v-col>
                <v-col>
                  <div class="brown--text text--darken-4 pt-2">時間</div>
                </v-col>
                <v-col cols="3">
                  <v-text-field dense color="brown darken-4" v-model.number="minutes" label="数字(半角)"> </v-text-field>
                </v-col>
                <v-col>
                  <div class="brown--text text--darken-4 pt-2">分</div>
                </v-col>
              </v-row>
            </div>
            <!--回数を選んだ場合-->
            <div v-if="HowMany">
              <p class="text-h6">どのくらいやった？</p>
              <v-col>
                <v-row>
                  <v-col cols="4">
                    <v-text-field v-model.number="times" label="数字(半角)"></v-text-field>
                  </v-col>
                  <v-col>
                    <div dense class="pt-7">回</div>
                  </v-col>
                </v-row>
              </v-col>
            </div>
            <div v-if="!HowLong && !HowMany">
              <v-col> たねをうえてね </v-col>
            </div>
            <v-row v-if="saveError && (HowLong || HowMany)">
              <p class="red--text pl-5">入力してください</p>
            </v-row>
          </v-col>
        </v-col>

        <v-card-actions v-if="HowLong || HowMany">
          <v-spacer></v-spacer>
          <v-row align-content="center" class="mb-6">
            <v-btn x-large class="cursive white--text text-h4 pr-7" color="red accent-2" @click="makeRecord">OK!</v-btn>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import { Timestamp } from "firebase/firestore";
import { v4 as uuid } from "uuid";

export default {
  name: "ReportGoal",
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
    closeDialog() {
      this.dialog = false;
    },
    makeRecord() {
      let value = undefined;
      let type = undefined;

      if (this.HowLong) {
        type = "timestamp";
        value = Timestamp.fromDate(new Date((this.hours * 3600 + this.minutes * 60) * 1000));
      } else if (this.HowMany) {
        type = "count";
        value = this.times;
      }

      if (value && type) {
        const goalId = this.$store.getters["user/getCurrentGoalId"];
        const data = {
          id: uuid(),
          goalId: goalId,
          value: {
            type: type,
            value: value,
          },
        };
        this.saveError = false;
        this.$store.dispatch("firebase/addRecord", data);
        this.dialog = false;
      } else {
        this.saveError = true;
      }
    },
  },

  computed: {
    ...mapState(["user"]),
    HowLong() {
      const goal = this.$store.getters["firebase/getOneGoal"](this.currentGoalId);
      if (goal && goal.dayGoal.type == "timestamp") return true;
      else return false;
    },
    HowMany() {
      const goal = this.$store.getters["firebase/getOneGoal"](this.currentGoalId);
      if (goal && (goal.dayGoal.type == "count" || goal.dayGoal.type == "bool")) return true;
      else return false;
    },
    currentGoalId() {
      return this.$store.getters["user/getCurrentGoalId"];
    },
  },
};
</script>

<style>
.close {
  margin-right: -15px;
}

.cursive {
  font-family: cursive;
}
</style>
