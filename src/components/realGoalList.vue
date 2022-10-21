<template>
  <v-row class="mt-3" justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-img v-bind="attrs" v-on="on" src="@/assets/cloud.png" max-height="200" max-width="200" style="align-items: center">
          <p style="display: flex; justify-content: center; align-items: center; text-align: center; margin: auto">もくひょうの<br />いちらん</p>
        </v-img>
      </template>
      <v-card>
        <v-toolbar color="#009A5B" dark class="mx-auto text-h5"> もくひょうのいちらん </v-toolbar>
        <v-card-text>
          <v-container>
            <template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    :items-per-page="5"
    class="elevation-1"
  ></v-data-table>
</template>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="#009A5B" text @click="closeDialog"> とじる </v-btn>
          
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapState } from "vuex";


import { v4 as uuid } from "uuid";
import { Timestamp } from "firebase/firestore";

export default {
  name: "realGoalList",
  data: () => ({
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10),
    date2: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10),
    menu1: false,
    menu2: false,
    howMuch: undefined,
    howLong: undefined,
    init: "",
    uid: "",
    what: undefined,
    name: undefined,
    dialog: false,

    //表
    headers: [
          {
            text: '',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: ' がんばること', value: 'title' },
          { text: 'ないよう', value: 'sub_title' },
          { text: 'いつから', value: 'start' },
          { text: 'いつまで', value: 'goal' },
        ],
        desserts: [
          {
            title: 'べんきょう',
            sub_title: 'フランス語',
            start: `YYYY/MM/DD`,
            goal: `YYYY/MM/DD`,
          },
        ],

  }),
  methods: {
    //初期の表示設定＿

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
      return this.howMuch != undefined;
    },
  },
  watch: {
    date() {
      this.dateFormatted = this.formatDate(this.date);
    },
  },
  components: {
   
  },
};
//dataプロパティが更新されたらcomputedが更新されるようにする
</script>