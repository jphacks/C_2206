<template>
  <v-row class="mt-n14">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-img class="ml-n3" v-bind="attrs" v-on="on" src="@/assets/sun.png" max-height="200" max-width="200" style="align-items: center">
          <p class="grey--text text--darken1" style="display: flex; justify-content: center; align-items: center; text-align: center; margin: auto">もくひょう<br />せってい</p>
        </v-img>
      </template>
      <v-card>
        <v-container class="green darken-1 white--text">
          <v-row class="" align-content="center">
            <v-btn icon absolute right justify-content="space-between" class="cursive close" @click="closeDialog">
              <v-icon color="white">mdi-close</v-icon>
            </v-btn>
            <v-col class="cap text-h5 pt-5">なにをがんばろう？</v-col>
          </v-row>
        </v-container>
        <v-card-text>
          <v-container>
            <v-row>
              <!-- 「なにを」 -->
              <v-col cols="12" sm="6" class="pt-7">
                <p class="cap text-h5">なにを</p>
              </v-col>

              <v-col cols="12" sm="6">
                <v-select :items="['べんきょう', 'うんどう', 'おてつだい', 'どくしょ']" filled label="かならずえらんでね" dense required v-model="what"></v-select>
              </v-col>

              <!-- 「くわしくかこう」 -->
              <v-col cols="12" sm="6" class="pt-4">
                <div v-if="inits">
                  <p class="cap text-h7">がんばることをくわしくかこう<br />(さらあらい、ジョギングなど)</p>
                </div>
              </v-col>

              <v-col cols="12" sm="6">
                <div v-if="inits">
                  <v-text-field v-model="name" filled label="できるならかいてね" dense required />
                </div>
              </v-col>

              <!-- 「どのぐらい」 -->

              <v-col cols="12" sm="6" class="">
                <div v-if="inits">
                  <p class="cap text-h5">どのぐらい</p>
                </div>
              </v-col>

              <v-col cols="12" sm="6">
                <div v-if="inits">
                  <v-select :items="['かい', 'さつ', 'じかん', 'こ']" filled label="かならずえらんでね" dense required v-model="init"> </v-select>
                </div>
              </v-col>

              <!-- 「かい」 -->
              <v-col cols="12" sm="12">
                <div v-if="howManyTimes">
                  <v-text-field v-model.number="howMuch" filled suffix="かい" label="すうじをいれてね（半角）" dense required />
                </div>
              </v-col>

              <!-- 「さつ」 -->
              <v-col cols="12" sm="12">
                <div v-if="howManyBooks">
                  <v-text-field v-model.number="howMuch" filled suffix="さつ" label="すうじをいれてね（半角）" dense required />
                </div>
              </v-col>

              <!-- 「じかん」-->
              <v-col cols="12" sm="12">
                <div v-if="howMuchTime" class="time">
                  <vue-timepicker placeholder="じかん：ふん" v-model="howLong"></vue-timepicker>
                </div>
              </v-col>

              <!-- 「こ」 -->
              <v-col cols="12" sm="12">
                <div v-if="howManyThings">
                  <v-text-field v-model.number="howMuch" filled suffix="こ" label="すうじをいれてね（半角）" dense required />
                </div>
              </v-col>

              <!-- 「カレンダー」 -->

              <v-col cols="12" sm="12" class="">
                <div v-if="tillWhenToWhen">
                  <p class="cap text-h6">いつから・いつまでに</p>
                </div>
              </v-col>
              <v-col cols="12">
                <div v-if="tillWhenToWhen">
                  <template>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6">
                          <v-menu ref="menu1" v-model="menu1" :close-on-content-click="false" transition="scale-transition" offset-y max-width="290px" min-width="auto">
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field v-model="date" label="いつから" persistent-hint prepend-icon="mdi-calendar" v-bind="attrs" v-on="on"></v-text-field>
                            </template>
                            <v-date-picker v-model="date" no-title @input="menu1 = false" :min="new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10)">
                            </v-date-picker>
                          </v-menu>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-menu ref="menu2" v-model="menu2" :close-on-content-click="false" transition="scale-transition" offset-y max-width="290px" min-width="auto">
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field v-model="date2" label="いつまで" persistent-hint prepend-icon="mdi-calendar" v-bind="attrs" v-on="on"></v-text-field>
                            </template>
                            <v-date-picker v-model="date2" no-title @input="menu2 = false" :min="new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10)">
                            </v-date-picker>
                          </v-menu>
                        </v-col>
                        <v-row>
                          <div v-if="dateIsWrong">
                            <small>「いつまで」が「いつから」よりもむかしだよ！</small>
                          </div>
                          <div v-if="timeIsWrong">
                            <small>じかんがおかしいよ！</small>
                          </div>
                          <div v-if="intIsWrong">
                            <small>なにかがにゅうりょくされてないよ！</small>
                          </div>
                        </v-row>
                      </v-row>
                    </v-container>
                  </template>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-row v-if="OKButton" align-content="center" class="mb-6">
            <v-btn x-large class="cursive white--text text-h4 pr-7" color="red accent-2" @click="makeGoal">OK!</v-btn>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapState } from "vuex";
import VueTimepicker from "vue2-timepicker";
import "vue2-timepicker/dist/VueTimepicker.css";
import { v4 as uuid } from "uuid";
import { Timestamp } from "firebase/firestore";

export default {
  name: "PopUps",
  data: () => ({
    date: null,
    date2: null,
    menu1: false,
    menu2: false,
    howMuch: undefined,
    howLong: undefined,
    init: "",
    uid: "",
    what: undefined,
    name: undefined,
    dialog: false,
    dateError: false,
    timeError: false,
    intError: false,
  }),
  methods: {
    //初期の表示設定

    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    },
    openPopUp() {
      (this.howMuchTime = false), (this.howManyBooks = false), (this.howMuchTimes = false), (this.tillWhenToWhen = false), (this.init = false);
    },
    closeDialog() {
      this.dialog = false;
    },
    makeGoal() {
      let start = new Date(this.date);
      let end = new Date(this.date2);
      let time = this.howLong;
      let int = this.howMuch;
      console.log(time);

      if (start.getTime() > end.getTime()) {
        this.dateError = true;
        console.log("Date Error");
        return 1;
      }

      if (time && time["HH"] == "00" && time["mm"] == "00") {
        this.timeError = true;
        console.log("Time Error");
        return 1;
      }

      if (time == undefined && int == undefined) {
        if (time == undefined) {
          this.intError = true;
        } else if (int == undefined) {
          this.nullError = true;
        }

        console.log("Null Error");
        return 1;
      }

      let value = undefined;
      let type = undefined;
      let sub_title = undefined;
      const Sub_titleDefine = () => {
        if (this.name != undefined) {
          sub_title = this.name;
        } else {
          sub_title = this.what;
        }
      };
      const DayGoalDefine = () => {
        if (this.howMuch != undefined) {
          type = "count";
          value = this.howMuch;
        } else if (this.howLong != undefined) {
          type = "timestamp";
          value = Timestamp.fromDate(new Date((this.howLong.HH * 3600 + this.howLong.mm * 60) * 1000));
        }
      };

      Sub_titleDefine();
      DayGoalDefine();
      const goalid = uuid();
      const data = {
        id: goalid,
        title: this.what,
        sub_title: sub_title,
        createdAt: Timestamp.now(),
        startDate: Timestamp.fromDate(new Date(this.date)),
        endDate: Timestamp.fromDate(new Date(this.date2)),
        dayGoal: {
          type: type,
          value: value,
        },
      };

      this.$store.commit("user/setCurrentGoalId", goalid);
      this.$store.dispatch("firebase/addGoal", data);
      this.dialog = false;
    },
  },
  computed: {
    ...mapState(["user"]),

    computedDateFormatted() {
      return this.formatDate(this.date);
    },

    //表示・非表示
    inits() {
      return this.what != undefined;
    },
    howMuchTime() {
      return this.init === "じかん";
    },
    howManyTimes() {
      return this.init === "かい";
    },
    howManyBooks() {
      return this.init === "さつ";
    },
    howManyThings() {
      return this.init === "こ";
    },
    tillWhenToWhen() {
      return this.howMuch != undefined || this.howLong != undefined;
    },
    dateIsWrong() {
      return this.dateError == true;
    },
    timeIsWrong() {
      return this.timeError == true;
    },
    intIsWrong() {
      return this.intError == true;
    },
    OKButton() {
      return this.date != null && this.date2 != null;
    },
  },
  watch: {
    date() {
      this.dateFormatted = this.formatDate(this.date);
    },
  },
  components: {
    "vue-timepicker": VueTimepicker,
  },
};
//dataプロパティが更新されたらcomputedが更新されるようにする
</script>

<style scoped>
small {
  color: red;
}

.time {
  text-align: center;
}

.cap {
  text-align: center;
}
</style>
